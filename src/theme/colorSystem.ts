import {
    onyxiaBrandModes,
    onyxiaColorModes,
    primitiveColorCollectionName,
    primitiveColorTokens,
    semanticColorCollectionName,
    semanticColorTokens,
    type HexColor,
    type OnyxiaBrandMode,
    type OnyxiaColorMode,
    type PrimitiveColorTokenName,
    type SemanticColorTokenName,
} from "../tokens/generated/colors";

type PrimitiveColorValues = Record<PrimitiveColorTokenName, HexColor>;
type SemanticColorAliases = Record<
    SemanticColorTokenName,
    PrimitiveColorTokenName
>;
type SemanticColorValues = Record<SemanticColorTokenName, HexColor>;

export type OnyxiaColorSystem = {
    brandMode: OnyxiaBrandMode;
    colorMode: OnyxiaColorMode;
    collections: {
        primitive: {
            name: typeof primitiveColorCollectionName;
            modes: typeof onyxiaBrandModes;
        };
        semantic: {
            name: typeof semanticColorCollectionName;
            modes: typeof onyxiaColorModes;
        };
    };
    primitive: PrimitiveColorValues;
    semantic: {
        aliases: SemanticColorAliases;
        values: SemanticColorValues;
    };
    getPrimitiveColor: (tokenName: PrimitiveColorTokenName) => HexColor;
    getSemanticAlias: (
        tokenName: SemanticColorTokenName,
    ) => PrimitiveColorTokenName;
    getSemanticColor: (tokenName: SemanticColorTokenName) => HexColor;
};

export type CreateOnyxiaColorSystemParams = {
    brandMode: OnyxiaBrandMode;
    colorMode: OnyxiaColorMode;
};

function typedEntries<T extends Record<string, unknown>>(object: T) {
    return Object.entries(object) as Array<[keyof T, T[keyof T]]>;
}

function resolvePrimitiveColors(
    brandMode: OnyxiaBrandMode,
): PrimitiveColorValues {
    const resolvedValues = {} as PrimitiveColorValues;

    for (const [tokenName, valuesByMode] of typedEntries(
        primitiveColorTokens,
    )) {
        resolvedValues[tokenName] = valuesByMode[brandMode];
    }

    return resolvedValues;
}

function resolveSemanticAliases(
    colorMode: OnyxiaColorMode,
): SemanticColorAliases {
    const resolvedAliases = {} as SemanticColorAliases;

    for (const [tokenName, aliasesByMode] of typedEntries(
        semanticColorTokens,
    )) {
        resolvedAliases[tokenName] = aliasesByMode[colorMode];
    }

    return resolvedAliases;
}

function resolveSemanticColors(params: {
    primitive: PrimitiveColorValues;
    aliases: SemanticColorAliases;
}): SemanticColorValues {
    const { primitive, aliases } = params;
    const resolvedValues = {} as SemanticColorValues;

    for (const [tokenName, primitiveTokenName] of typedEntries(aliases)) {
        resolvedValues[tokenName] = primitive[primitiveTokenName];
    }

    return resolvedValues;
}

export function createOnyxiaColorSystem(
    params: CreateOnyxiaColorSystemParams,
): OnyxiaColorSystem {
    const { brandMode, colorMode } = params;
    const primitive = resolvePrimitiveColors(brandMode);
    const semanticAliases = resolveSemanticAliases(colorMode);
    const semanticValues = resolveSemanticColors({
        primitive,
        aliases: semanticAliases,
    });

    return {
        brandMode,
        colorMode,
        collections: {
            primitive: {
                name: primitiveColorCollectionName,
                modes: onyxiaBrandModes,
            },
            semantic: {
                name: semanticColorCollectionName,
                modes: onyxiaColorModes,
            },
        },
        primitive,
        semantic: {
            aliases: semanticAliases,
            values: semanticValues,
        },
        getPrimitiveColor: tokenName => primitive[tokenName],
        getSemanticAlias: tokenName => semanticAliases[tokenName],
        getSemanticColor: tokenName => semanticValues[tokenName],
    };
}

export type {
    HexColor,
    OnyxiaBrandMode,
    OnyxiaColorMode,
    PrimitiveColorTokenName,
    SemanticColorTokenName,
} from "../tokens/generated/colors";
export {
    onyxiaBrandModes,
    onyxiaColorModes,
    primitiveColorCollectionName,
    primitiveColorTokens,
    semanticColorCollectionName,
    semanticColorTokens,
} from "../tokens/generated/colors";
