import type { CSSProperties } from "react";
import {
    onyxiaTypographyBrandModes,
    onyxiaTypographyStyleModes,
    typefaceCollectionName,
    typographyCollectionName,
    typographyStyleTokensByMode,
    typographyTypefacesByBrand,
    type OnyxiaTypefaceRole,
    type OnyxiaTypographyStyleMode,
    type TypographyStyleDefinition,
} from "../tokens/generated/typography";
import {
    breakpointsValues,
    resolveOnyxiaResponsiveValue,
    type OnyxiaBreakpoint,
} from "./breakpoints";
import type { OnyxiaBrandMode } from "./colorSystem";

export const typographyModeByBreakpoint = {
    xs: "default",
    sm: "default",
    md: "default",
    lg: "default",
    xl: "default",
} as const satisfies Record<"xs" | OnyxiaBreakpoint, OnyxiaTypographyStyleMode>;

export type OnyxiaTypographyStyle = TypographyStyleDefinition & {
    fontFamily: string;
};

type TypographyStyleTree =
    (typeof typographyStyleTokensByMode)[OnyxiaTypographyStyleMode];

type ResolvedTypographyTree<T> = T extends TypographyStyleDefinition
    ? OnyxiaTypographyStyle
    : { [K in keyof T]: ResolvedTypographyTree<T[K]> };

export type OnyxiaTypographyStyles =
    ResolvedTypographyTree<TypographyStyleTree>;

export type OnyxiaTypographyCssProperties = Pick<
    CSSProperties,
    "fontFamily" | "fontWeight" | "fontSize" | "lineHeight"
>;

export type OnyxiaTypographySystem = {
    collections: {
        typefaces: {
            name: typeof typefaceCollectionName;
            modes: typeof onyxiaTypographyBrandModes;
        };
        styles: {
            name: typeof typographyCollectionName;
            modes: typeof onyxiaTypographyStyleModes;
        };
    };
    typefaces: Record<OnyxiaTypefaceRole, string>;
    styles: OnyxiaTypographyStyles;
    responsive: {
        activeMode: OnyxiaTypographyStyleMode;
        modeByBreakpoint: typeof typographyModeByBreakpoint;
    };
    getTypeface: (typefaceRole: OnyxiaTypefaceRole) => string;
    toCssProperties: (
        style: OnyxiaTypographyStyle,
    ) => OnyxiaTypographyCssProperties;
};

function isTypographyStyleDefinition(
    value: unknown,
): value is TypographyStyleDefinition {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }

    return ["typeface", "fontWeight", "fontSize", "lineHeight"].every(
        key => key in value,
    );
}

function resolveTypographyTree<T>(
    styleTree: T,
    typefaces: Record<OnyxiaTypefaceRole, string>,
): ResolvedTypographyTree<T> {
    if (isTypographyStyleDefinition(styleTree)) {
        return {
            ...styleTree,
            fontFamily: typefaces[styleTree.typeface],
        } as unknown as ResolvedTypographyTree<T>;
    }

    return Object.fromEntries(
        Object.entries(styleTree as Record<string, unknown>).map(
            ([key, value]) => [key, resolveTypographyTree(value, typefaces)],
        ),
    ) as unknown as ResolvedTypographyTree<T>;
}

export function typographyStyleToCssProperties(
    style: OnyxiaTypographyStyle,
): OnyxiaTypographyCssProperties {
    return {
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        fontSize: `${style.fontSize}px`,
        lineHeight: `${style.lineHeight}px`,
    };
}

function resolveTypographyStyleMode(params: {
    windowInnerWidth: number;
}): OnyxiaTypographyStyleMode {
    return resolveOnyxiaResponsiveValue({
        valuesByBreakpoint: typographyModeByBreakpoint,
        windowInnerWidth: params.windowInnerWidth,
    });
}

export function createOnyxiaTypographySystem(params: {
    brandMode: OnyxiaBrandMode;
    windowInnerWidth?: number;
}): OnyxiaTypographySystem {
    const { brandMode, windowInnerWidth = breakpointsValues.xl } = params;
    const typefaces = typographyTypefacesByBrand[brandMode];
    const activeMode = resolveTypographyStyleMode({ windowInnerWidth });
    const styles = resolveTypographyTree(
        typographyStyleTokensByMode[activeMode],
        typefaces,
    );

    return {
        collections: {
            typefaces: {
                name: typefaceCollectionName,
                modes: onyxiaTypographyBrandModes,
            },
            styles: {
                name: typographyCollectionName,
                modes: onyxiaTypographyStyleModes,
            },
        },
        typefaces,
        styles,
        responsive: {
            activeMode,
            modeByBreakpoint: typographyModeByBreakpoint,
        },
        getTypeface: typefaceRole => typefaces[typefaceRole],
        toCssProperties: typographyStyleToCssProperties,
    };
}

export { onyxiaTypefaceRoles } from "../tokens/generated/typography";
export type {
    OnyxiaTypefaceRole,
    OnyxiaTypographyStyleMode,
} from "../tokens/generated/typography";
