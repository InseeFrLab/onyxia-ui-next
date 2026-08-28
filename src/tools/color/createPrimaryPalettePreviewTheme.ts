import { createTheme, type Theme } from "@mui/material/styles";
import {
    createOnyxiaColorSystem,
    type OnyxiaColorMode,
    type OnyxiaTheme,
} from "../../theme";
import {
    createOnyxiaMuiComponentOverrides,
    createOnyxiaMuiPaletteOptions,
} from "../../theme/mui";
import {
    resolveSemanticColorValues,
    type PrimitiveColorValues,
} from "../../theme/colorSystem";
import type {
    GeneratedPrimaryAlphaPalette,
    GeneratedPrimaryPalette,
} from "./generatePrimaryPalette";

function getPreviewPrimaryPrimitiveOverrides(params: {
    palette: GeneratedPrimaryPalette;
    alphaPalette: GeneratedPrimaryAlphaPalette;
}): Partial<PrimitiveColorValues> {
    const { palette, alphaPalette } = params;

    return {
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
    };
}

export function createPrimaryPalettePreviewTheme(params: {
    baseTheme: Theme;
    colorMode: OnyxiaColorMode;
    palette: GeneratedPrimaryPalette;
    alphaPalette: GeneratedPrimaryAlphaPalette;
}): Theme {
    const { baseTheme, colorMode, palette, alphaPalette } = params;
    const baseColorSystem = createOnyxiaColorSystem({
        brandMode: baseTheme.onyxia.brandMode,
        colorMode,
    });
    const primitive: PrimitiveColorValues = {
        ...baseColorSystem.primitive,
        ...getPreviewPrimaryPrimitiveOverrides({
            palette,
            alphaPalette,
        }),
    };
    const aliases = baseColorSystem.semantic.aliases;
    const values = resolveSemanticColorValues({
        primitive,
        aliases,
    });
    const previewOnyxia: OnyxiaTheme = {
        ...baseTheme.onyxia,
        ...baseColorSystem,
        primitive,
        semantic: {
            aliases,
            values,
        },
        getPrimitiveColor: tokenName => primitive[tokenName],
        getSemanticAlias: tokenName => aliases[tokenName],
        getSemanticColor: tokenName => values[tokenName],
    };

    return createTheme(baseTheme, {
        palette: createOnyxiaMuiPaletteOptions(previewOnyxia),
        components: createOnyxiaMuiComponentOverrides(previewOnyxia),
        onyxia: previewOnyxia,
    });
}
