export type HexColor = `#${string}`;

type SrgbColor = {
    r: number;
    g: number;
    b: number;
};

type OklabColor = {
    l: number;
    a: number;
    b: number;
};

export type OklchColor = {
    l: number;
    c: number;
    h: number;
};

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function normalizeHexColor(hex: string): HexColor {
    const trimmed = hex.trim();
    const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    const normalized = withHash.toUpperCase();

    if (!/^#[0-9A-F]{6}$/.test(normalized)) {
        throw new Error(
            `Invalid hex color ${JSON.stringify(
                hex,
            )}. Expected a 6-digit sRGB hex value like #FE3711.`,
        );
    }

    return normalized as HexColor;
}

export function isHexColor(value: string): value is HexColor {
    try {
        normalizeHexColor(value);

        return true;
    } catch {
        return false;
    }
}

export function hexToRgb(hex: string) {
    const normalized = normalizeHexColor(hex).slice(1);

    return {
        r: Number.parseInt(normalized.slice(0, 2), 16),
        g: Number.parseInt(normalized.slice(2, 4), 16),
        b: Number.parseInt(normalized.slice(4, 6), 16),
    };
}

function srgb255ToUnit(rgb: { r: number; g: number; b: number }): SrgbColor {
    return {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255,
    };
}

function unitToSrgb255(rgb: SrgbColor) {
    return {
        r: Math.round(clamp(rgb.r, 0, 1) * 255),
        g: Math.round(clamp(rgb.g, 0, 1) * 255),
        b: Math.round(clamp(rgb.b, 0, 1) * 255),
    };
}

function toLinear(value: number) {
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function fromLinear(value: number) {
    return value <= 0.0031308
        ? 12.92 * value
        : 1.055 * value ** (1 / 2.4) - 0.055;
}

function srgbToLinearRgb(rgb: SrgbColor): SrgbColor {
    return {
        r: toLinear(rgb.r),
        g: toLinear(rgb.g),
        b: toLinear(rgb.b),
    };
}

function linearRgbToSrgb(rgb: SrgbColor): SrgbColor {
    return {
        r: fromLinear(rgb.r),
        g: fromLinear(rgb.g),
        b: fromLinear(rgb.b),
    };
}

export function hexToOklch(hex: string): OklchColor {
    const rgb = srgbToLinearRgb(srgb255ToUnit(hexToRgb(hex)));

    const l =
        0.4122214708 * rgb.r + 0.5363325363 * rgb.g + 0.0514459929 * rgb.b;
    const m =
        0.2119034982 * rgb.r + 0.6806995451 * rgb.g + 0.1073969566 * rgb.b;
    const s =
        0.0883024619 * rgb.r + 0.2817188376 * rgb.g + 0.6299787005 * rgb.b;

    const lRoot = Math.cbrt(l);
    const mRoot = Math.cbrt(m);
    const sRoot = Math.cbrt(s);

    const lab: OklabColor = {
        l: 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
        a: 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
        b: 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
    };

    const c = Math.sqrt(lab.a ** 2 + lab.b ** 2);
    const h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;

    return {
        l: lab.l,
        c,
        h: h >= 0 ? h : h + 360,
    };
}

function oklchToLinearRgb(color: OklchColor): SrgbColor {
    const a = color.c * Math.cos((color.h * Math.PI) / 180);
    const b = color.c * Math.sin((color.h * Math.PI) / 180);

    const lRoot = color.l + 0.3963377774 * a + 0.2158037573 * b;
    const mRoot = color.l - 0.1055613458 * a - 0.0638541728 * b;
    const sRoot = color.l - 0.0894841775 * a - 1.291485548 * b;

    return {
        r:
            4.0767416621 * lRoot ** 3 -
            3.3077115913 * mRoot ** 3 +
            0.2309699292 * sRoot ** 3,
        g:
            -1.2684380046 * lRoot ** 3 +
            2.6097574011 * mRoot ** 3 -
            0.3413193965 * sRoot ** 3,
        b:
            -0.0041960863 * lRoot ** 3 -
            0.7034186147 * mRoot ** 3 +
            1.707614701 * sRoot ** 3,
    };
}

function isLinearRgbInGamut(rgb: SrgbColor) {
    return (
        rgb.r >= 0 &&
        rgb.r <= 1 &&
        rgb.g >= 0 &&
        rgb.g <= 1 &&
        rgb.b >= 0 &&
        rgb.b <= 1
    );
}

export function oklchToHex(color: OklchColor): HexColor {
    const linearRgb = oklchToLinearRgb(color);

    if (!isLinearRgbInGamut(linearRgb)) {
        throw new Error("OKLCH color is outside the sRGB gamut");
    }

    const rgb = unitToSrgb255(linearRgbToSrgb(linearRgb));

    return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g
        .toString(16)
        .padStart(2, "0")}${rgb.b
        .toString(16)
        .padStart(2, "0")}`.toUpperCase() as HexColor;
}

export function oklchToHexInGamut(color: OklchColor): HexColor {
    const normalizedColor = {
        l: clamp(color.l, 0, 1),
        c: Math.max(0, color.c),
        h: ((color.h % 360) + 360) % 360,
    };

    try {
        return oklchToHex(normalizedColor);
    } catch {
        let low = 0;
        let high = normalizedColor.c;
        let lastValid: HexColor | null = null;

        for (let index = 0; index < 24; index += 1) {
            const candidate = {
                ...normalizedColor,
                c: (low + high) / 2,
            };

            try {
                lastValid = oklchToHex(candidate);
                low = candidate.c;
            } catch {
                high = candidate.c;
            }
        }

        if (lastValid !== null) {
            return lastValid;
        }

        return oklchToHex({
            ...normalizedColor,
            c: 0,
        });
    }
}

export function withHexAlpha(hex: string, alphaPercentage: number): HexColor {
    const normalized = normalizeHexColor(hex);
    const clampedAlpha = clamp(alphaPercentage / 100, 0, 1);
    const alphaHex = Math.round(clampedAlpha * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();

    return `${normalized}${alphaHex}` as HexColor;
}

export function getRelativeLuminance(hex: string) {
    const rgb = srgb255ToUnit(hexToRgb(hex));
    const linear = srgbToLinearRgb(rgb);

    return 0.2126 * linear.r + 0.7152 * linear.g + 0.0722 * linear.b;
}

export function getContrastRatio(foreground: string, background: string) {
    const foregroundLuminance = getRelativeLuminance(foreground);
    const backgroundLuminance = getRelativeLuminance(background);
    const lighter = Math.max(foregroundLuminance, backgroundLuminance);
    const darker = Math.min(foregroundLuminance, backgroundLuminance);

    return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastInterpretation(ratio: number) {
    if (ratio >= 7) {
        return "Strong contrast for normal text.";
    }

    if (ratio >= 4.5) {
        return "Generally acceptable for normal text.";
    }

    if (ratio >= 3) {
        return "Better suited to large text or non-text UI.";
    }

    return "Potential accessibility concern for text and UI.";
}

export function getPerceivedLightness(hex: string) {
    return hexToOklch(hex).l;
}
