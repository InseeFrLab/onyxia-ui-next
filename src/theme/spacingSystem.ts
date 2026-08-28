import {
    onyxiaSpacingTokenNames,
    spacingCollectionName,
    spacingTokens,
    type OnyxiaSpacingTokenName,
} from "../tokens/generated/spacing";
import {
    breakpointsValues,
    getOnyxiaActiveBreakpoint,
    resolveOnyxiaResponsiveValue,
    type OnyxiaResponsiveBreakpoint,
} from "./breakpoints";

type CssSpacingValue = `${number}px`;

type DirectionalSpacingTokens = {
    topBottom: OnyxiaSpacingTokenName;
    rightLeft: OnyxiaSpacingTokenName;
};

type SpacingKind = "padding" | "margin";

export type OnyxiaSpacingSystem = {
    collection: {
        name: typeof spacingCollectionName;
        tokenNames: typeof onyxiaSpacingTokenNames;
    };
    values: Record<OnyxiaSpacingTokenName, number>;
    responsive: {
        activeBreakpoint: OnyxiaResponsiveBreakpoint;
        resolve: <T>(
            valuesByBreakpoint: Partial<Record<OnyxiaResponsiveBreakpoint, T>>,
        ) => T;
    };
    get: (tokenName: OnyxiaSpacingTokenName) => number;
    toCssValue: (tokenName: OnyxiaSpacingTokenName) => CssSpacingValue;
    toCssInset: (tokens: DirectionalSpacingTokens) => string;
    topBottom: <Kind extends SpacingKind>(
        kind: Kind,
        tokenName: OnyxiaSpacingTokenName,
    ) => Record<`${"top" | "bottom"}${Capitalize<Kind>}`, CssSpacingValue>;
    rightLeft: <Kind extends SpacingKind>(
        kind: Kind,
        tokenName: OnyxiaSpacingTokenName,
    ) => Record<`${"left" | "right"}${Capitalize<Kind>}`, CssSpacingValue>;
};

function toCssSpacingValue(value: number): CssSpacingValue {
    return `${value}px`;
}

function capitalize(value: SpacingKind): Capitalize<SpacingKind> {
    return `${value[0].toUpperCase()}${value.slice(
        1,
    )}` as Capitalize<SpacingKind>;
}

export function createOnyxiaSpacingSystem(params: {
    windowInnerWidth?: number;
}): OnyxiaSpacingSystem {
    const { windowInnerWidth = breakpointsValues.xl } = params;
    const values = { ...spacingTokens } as Record<
        OnyxiaSpacingTokenName,
        number
    >;
    const activeBreakpoint = getOnyxiaActiveBreakpoint(windowInnerWidth);

    const get = (tokenName: OnyxiaSpacingTokenName) => values[tokenName];
    const toCssValue = (tokenName: OnyxiaSpacingTokenName) =>
        toCssSpacingValue(get(tokenName));

    return {
        collection: {
            name: spacingCollectionName,
            tokenNames: onyxiaSpacingTokenNames,
        },
        values,
        responsive: {
            activeBreakpoint,
            resolve: valuesByBreakpoint =>
                resolveOnyxiaResponsiveValue({
                    valuesByBreakpoint,
                    windowInnerWidth,
                }),
        },
        get,
        toCssValue,
        toCssInset: ({ topBottom, rightLeft }) =>
            `${toCssValue(topBottom)} ${toCssValue(rightLeft)}`,
        topBottom: (kind, tokenName) => {
            const cssValue = toCssValue(tokenName);
            const kindSuffix = capitalize(kind);

            return {
                [`top${kindSuffix}`]: cssValue,
                [`bottom${kindSuffix}`]: cssValue,
            } as Record<
                `${"top" | "bottom"}${Capitalize<typeof kind>}`,
                CssSpacingValue
            >;
        },
        rightLeft: (kind, tokenName) => {
            const cssValue = toCssValue(tokenName);
            const kindSuffix = capitalize(kind);

            return {
                [`left${kindSuffix}`]: cssValue,
                [`right${kindSuffix}`]: cssValue,
            } as Record<
                `${"left" | "right"}${Capitalize<typeof kind>}`,
                CssSpacingValue
            >;
        },
    };
}

export type { OnyxiaSpacingTokenName } from "../tokens/generated/spacing";
export {
    onyxiaSpacingTokenNames,
    spacingCollectionName,
    spacingTokens,
} from "../tokens/generated/spacing";
