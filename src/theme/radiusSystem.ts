import {
    onyxiaRadiusTokenNames,
    radiusCollectionName,
    radiusTokens,
    type OnyxiaRadiusTokenName,
} from "../tokens/generated/radius";

type CssRadiusValue = `${number}px`;

export type OnyxiaRadiusSystem = {
    collection: {
        name: typeof radiusCollectionName;
        tokenNames: typeof onyxiaRadiusTokenNames;
        fullTokenName: "radius-full";
    };
    values: Record<OnyxiaRadiusTokenName, number>;
    get: (tokenName: OnyxiaRadiusTokenName) => number;
    toCssValue: (tokenName: OnyxiaRadiusTokenName) => CssRadiusValue;
};

function toCssRadiusValue(value: number): CssRadiusValue {
    return `${value}px`;
}

export function createOnyxiaRadiusSystem(): OnyxiaRadiusSystem {
    const values = { ...radiusTokens } as Record<OnyxiaRadiusTokenName, number>;
    const get = (tokenName: OnyxiaRadiusTokenName) => values[tokenName];

    return {
        collection: {
            name: radiusCollectionName,
            tokenNames: onyxiaRadiusTokenNames,
            fullTokenName: "radius-full",
        },
        values,
        get,
        toCssValue: tokenName => toCssRadiusValue(get(tokenName)),
    };
}

export type { OnyxiaRadiusTokenName } from "../tokens/generated/radius";
export {
    onyxiaRadiusTokenNames,
    radiusCollectionName,
    radiusTokens,
} from "../tokens/generated/radius";
