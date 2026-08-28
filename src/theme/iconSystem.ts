import type { OnyxiaSizingSystem, OnyxiaSizingTokenName } from "./sizingSystem";
import {
    iconSizeTokenToSizingToken,
    onyxiaIconSizeTokenNames,
    type OnyxiaIconSizeTokenName,
} from "../tokens/generated/icons";

export const iconCollectionName = "icon" as const;
export const defaultOnyxiaIconSizeTokenName = "icon-size-4" as const;

type CssIconSize = `${number}px`;

export type OnyxiaIconSystem = {
    collection: {
        name: typeof iconCollectionName;
        sizeTokenNames: typeof onyxiaIconSizeTokenNames;
        defaultSizeTokenName: typeof defaultOnyxiaIconSizeTokenName;
    };
    sizes: Record<OnyxiaIconSizeTokenName, number>;
    sizingTokens: Record<OnyxiaIconSizeTokenName, OnyxiaSizingTokenName>;
    getSizeInPx: (tokenName: OnyxiaIconSizeTokenName) => number;
    toCssSize: (tokenName: OnyxiaIconSizeTokenName) => CssIconSize;
};

function toCssIconSize(value: number): CssIconSize {
    return `${value}px`;
}

export function createOnyxiaIconSystem(params: {
    sizing: OnyxiaSizingSystem;
}): OnyxiaIconSystem {
    const { sizing } = params;
    const sizes = Object.fromEntries(
        onyxiaIconSizeTokenNames.map(tokenName => [
            tokenName,
            sizing.get(iconSizeTokenToSizingToken[tokenName]),
        ]),
    ) as Record<OnyxiaIconSizeTokenName, number>;
    const getSizeInPx = (tokenName: OnyxiaIconSizeTokenName) =>
        sizes[tokenName];

    return {
        collection: {
            name: iconCollectionName,
            sizeTokenNames: onyxiaIconSizeTokenNames,
            defaultSizeTokenName: defaultOnyxiaIconSizeTokenName,
        },
        sizes,
        sizingTokens: {
            ...iconSizeTokenToSizingToken,
        } as Record<OnyxiaIconSizeTokenName, OnyxiaSizingTokenName>,
        getSizeInPx,
        toCssSize: tokenName => toCssIconSize(getSizeInPx(tokenName)),
    };
}

export { onyxiaIconSizeTokenNames } from "../tokens/generated/icons";
export type { OnyxiaIconSizeTokenName } from "../tokens/generated/icons";
