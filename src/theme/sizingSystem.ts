import {
    onyxiaSizingTokenNames,
    sizingCollectionName,
    sizingTokens,
    type OnyxiaSizingTokenName,
} from "../tokens/generated/sizing";
import {
    breakpointsValues,
    getOnyxiaActiveBreakpoint,
    resolveOnyxiaResponsiveValue,
    type OnyxiaResponsiveBreakpoint,
} from "./breakpoints";

type CssSizingValue = `${number}px`;

export type OnyxiaSizingSystem = {
    collection: {
        name: typeof sizingCollectionName;
        tokenNames: typeof onyxiaSizingTokenNames;
        largestTokenName: "size-full";
    };
    values: Record<OnyxiaSizingTokenName, number>;
    responsive: {
        activeBreakpoint: OnyxiaResponsiveBreakpoint;
        resolve: <T>(
            valuesByBreakpoint: Partial<Record<OnyxiaResponsiveBreakpoint, T>>,
        ) => T;
    };
    get: (tokenName: OnyxiaSizingTokenName) => number;
    toCssValue: (tokenName: OnyxiaSizingTokenName) => CssSizingValue;
};

function toCssSizingValue(value: number): CssSizingValue {
    return `${value}px`;
}

export function createOnyxiaSizingSystem(params: {
    windowInnerWidth?: number;
}): OnyxiaSizingSystem {
    const { windowInnerWidth = breakpointsValues.xl } = params;
    const values = { ...sizingTokens } as Record<OnyxiaSizingTokenName, number>;
    const activeBreakpoint = getOnyxiaActiveBreakpoint(windowInnerWidth);
    const get = (tokenName: OnyxiaSizingTokenName) => values[tokenName];

    return {
        collection: {
            name: sizingCollectionName,
            tokenNames: onyxiaSizingTokenNames,
            largestTokenName: "size-full",
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
        toCssValue: tokenName => toCssSizingValue(get(tokenName)),
    };
}

export type { OnyxiaSizingTokenName } from "../tokens/generated/sizing";
export {
    onyxiaSizingTokenNames,
    sizingCollectionName,
    sizingTokens,
} from "../tokens/generated/sizing";
