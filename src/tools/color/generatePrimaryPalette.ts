import {
    normalizeHexColor,
    hexToOklch,
    oklchToHexInGamut,
    withHexAlpha,
    type HexColor,
} from "./colorUtils";

const tonalSteps = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;
const alphaSteps = [10, 20] as const;

type TonalStep = (typeof tonalSteps)[number];
type AlphaStep = (typeof alphaSteps)[number];
type LightTonalStep = 50 | 100 | 200 | 300 | 400;
type DarkTonalStep = 600 | 700 | 800 | 900 | 950;

export type GeneratedPrimaryPalette = Record<TonalStep, HexColor>;
export type GeneratedPrimaryAlphaPalette = Record<
    `primary-alpha-${AlphaStep}`,
    HexColor
>;

type GenerationProfile = {
    l: number;
    cScale: number;
};

type DarkGenerationProfile = GenerationProfile & {
    minDeltaFromAnchor: number;
};

const lightProfiles: Record<LightTonalStep, GenerationProfile> = {
    50: { l: 0.97, cScale: 0.12 },
    100: { l: 0.93, cScale: 0.2 },
    200: { l: 0.87, cScale: 0.34 },
    300: { l: 0.8, cScale: 0.52 },
    400: { l: 0.73, cScale: 0.78 },
};

const darkProfiles: Record<DarkTonalStep, DarkGenerationProfile> = {
    600: { l: 0.58, cScale: 0.95, minDeltaFromAnchor: 0.02 },
    700: { l: 0.46, cScale: 0.85, minDeltaFromAnchor: 0.05 },
    800: { l: 0.35, cScale: 0.72, minDeltaFromAnchor: 0.09 },
    900: { l: 0.25, cScale: 0.58, minDeltaFromAnchor: 0.13 },
    950: { l: 0.19, cScale: 0.46, minDeltaFromAnchor: 0.17 },
};

function mix(start: number, end: number, weight: number) {
    return start + (end - start) * weight;
}

function getTargetLightness(step: TonalStep, anchorLightness: number) {
    if (step === 500) {
        return anchorLightness;
    }

    if (step < 500) {
        const profile = lightProfiles[step as LightTonalStep];

        return mix(profile.l, anchorLightness, 0.18);
    }

    const profile = darkProfiles[step as DarkTonalStep];
    const absoluteTarget = mix(anchorLightness, profile.l, 0.82);
    const relativeTarget = anchorLightness - profile.minDeltaFromAnchor;

    return Math.max(0, Math.min(absoluteTarget, relativeTarget));
}

function getTargetChroma(step: TonalStep, anchorChroma: number) {
    if (step === 500) {
        return anchorChroma;
    }

    if (step < 500) {
        return anchorChroma * lightProfiles[step as LightTonalStep].cScale;
    }

    return anchorChroma * darkProfiles[step as DarkTonalStep].cScale;
}

function resolveDistinctHexColor(params: {
    step: TonalStep;
    anchorLightness: number;
    anchorChroma: number;
    hue: number;
    previousHex?: HexColor;
}) {
    const { step, anchorLightness, anchorChroma, hue, previousHex } = params;
    const baseLightness = getTargetLightness(step, anchorLightness);
    const baseChroma = getTargetChroma(step, anchorChroma);

    for (let attempt = 0; attempt < 8; attempt += 1) {
        const lightnessNudge = step < 500 ? -attempt * 0.012 : -attempt * 0.01;
        const chromaNudge =
            step < 500
                ? attempt * 0.01 * anchorChroma
                : -attempt * 0.01 * anchorChroma;
        const hex = oklchToHexInGamut({
            l: Math.max(0, Math.min(1, baseLightness + lightnessNudge)),
            c: Math.max(0, baseChroma + chromaNudge),
            h: hue,
        });

        if (hex !== previousHex) {
            return hex;
        }
    }

    return oklchToHexInGamut({
        l: Math.max(0, Math.min(1, baseLightness - 0.02)),
        c: Math.max(0, baseChroma * 0.85),
        h: hue,
    });
}

export function generatePrimaryPalette(
    inputHex: string,
): GeneratedPrimaryPalette {
    const anchorHex = normalizeHexColor(inputHex);
    const anchor = hexToOklch(anchorHex);
    const palette = {} as GeneratedPrimaryPalette;

    for (const step of tonalSteps) {
        if (step === 500) {
            palette[step] = anchorHex;
            continue;
        }

        palette[step] = resolveDistinctHexColor({
            step,
            anchorLightness: anchor.l,
            anchorChroma: anchor.c,
            hue: anchor.h,
            previousHex: palette[tonalSteps[tonalSteps.indexOf(step) - 1]],
        });
    }

    return palette;
}

export function generatePrimaryAlphaPalette(
    inputHex: string,
): GeneratedPrimaryAlphaPalette {
    const anchorHex = normalizeHexColor(inputHex);

    return {
        "primary-alpha-10": withHexAlpha(anchorHex, 10),
        "primary-alpha-20": withHexAlpha(anchorHex, 20),
    };
}

export function formatPrimaryPaletteJson(
    palette: GeneratedPrimaryPalette,
    alphaPalette = generatePrimaryAlphaPalette(palette[500]),
) {
    return JSON.stringify(
        {
            "colors-palette/accent/primary/primary-50": palette[50],
            "colors-palette/accent/primary/primary-100": palette[100],
            "colors-palette/accent/primary/primary-200": palette[200],
            "colors-palette/accent/primary/primary-300": palette[300],
            "colors-palette/accent/primary/primary-400": palette[400],
            "colors-palette/accent/primary/primary-500": palette[500],
            "colors-palette/accent/primary/primary-600": palette[600],
            "colors-palette/accent/primary/primary-700": palette[700],
            "colors-palette/accent/primary/primary-800": palette[800],
            "colors-palette/accent/primary/primary-900": palette[900],
            "colors-palette/accent/primary/primary-950": palette[950],
            "colors-palette/accent/primary/primary-alpha-10":
                alphaPalette["primary-alpha-10"],
            "colors-palette/accent/primary/primary-alpha-20":
                alphaPalette["primary-alpha-20"],
        },
        null,
        4,
    );
}

export function formatPrimaryPaletteHexList(palette: GeneratedPrimaryPalette) {
    return tonalSteps
        .map(step => `primary-${step}: ${palette[step]}`)
        .join("\n");
}

export {
    tonalSteps as primaryPaletteTonalSteps,
    alphaSteps as primaryPaletteAlphaSteps,
};
