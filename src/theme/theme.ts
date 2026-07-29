import {
    createTheme,
    useTheme,
    type Theme,
    type ThemeOptions,
} from "@mui/material/styles";
import {
    createOnyxiaColorSystem,
    type CreateOnyxiaColorSystemParams,
    type OnyxiaColorSystem,
    type SemanticColorTokenName,
} from "./colorSystem";
import {
    createOnyxiaMuiComponentOverrides,
    createOnyxiaMuiPaletteOptions,
} from "./mui";

export type CreateOnyxiaThemeParams = CreateOnyxiaColorSystemParams;

export function createOnyxiaThemeOptions(
    params: CreateOnyxiaThemeParams,
): ThemeOptions {
    const onyxia = createOnyxiaColorSystem(params);

    return {
        palette: createOnyxiaMuiPaletteOptions(onyxia),
        components: createOnyxiaMuiComponentOverrides(onyxia),
        onyxia,
    };
}

export function createOnyxiaTheme(params: CreateOnyxiaThemeParams): Theme {
    return createTheme(createOnyxiaThemeOptions(params));
}

export function useOnyxiaColorSystem(): OnyxiaColorSystem {
    return useTheme().onyxia;
}

export function useOnyxiaSemanticColor(
    tokenName: SemanticColorTokenName,
): string {
    return useTheme().onyxia.getSemanticColor(tokenName);
}
