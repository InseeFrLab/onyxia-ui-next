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
    createOnyxiaMuiShapeOptions,
    createOnyxiaMuiSpacing,
    createOnyxiaMuiTypographyOptions,
} from "./mui";
import { createOnyxiaIconSystem, type OnyxiaIconSystem } from "./iconSystem";
import {
    createOnyxiaRadiusSystem,
    type OnyxiaRadiusSystem,
} from "./radiusSystem";
import {
    createOnyxiaSpacingSystem,
    type OnyxiaSpacingSystem,
} from "./spacingSystem";
import {
    createOnyxiaSizingSystem,
    type OnyxiaSizingSystem,
} from "./sizingSystem";
import {
    createOnyxiaTypographySystem,
    type OnyxiaTypographySystem,
} from "./typographySystem";

export type CreateOnyxiaThemeParams = CreateOnyxiaColorSystemParams & {
    windowInnerWidth?: number;
};
export type OnyxiaTheme = OnyxiaColorSystem & {
    icon: OnyxiaIconSystem;
    radius: OnyxiaRadiusSystem;
    spacing: OnyxiaSpacingSystem;
    sizing: OnyxiaSizingSystem;
    typography: OnyxiaTypographySystem;
};

export function createOnyxiaThemeOptions(
    params: CreateOnyxiaThemeParams,
): ThemeOptions {
    const colorSystem = createOnyxiaColorSystem(params);
    const spacing = createOnyxiaSpacingSystem({
        windowInnerWidth: params.windowInnerWidth,
    });
    const sizing = createOnyxiaSizingSystem({
        windowInnerWidth: params.windowInnerWidth,
    });
    const icon = createOnyxiaIconSystem({ sizing });
    const radius = createOnyxiaRadiusSystem();
    const typography = createOnyxiaTypographySystem({
        brandMode: params.brandMode,
        windowInnerWidth: params.windowInnerWidth,
    });
    const onyxia: OnyxiaTheme = {
        ...colorSystem,
        icon,
        radius,
        spacing,
        sizing,
        typography,
    };

    return {
        palette: createOnyxiaMuiPaletteOptions(onyxia),
        shape: createOnyxiaMuiShapeOptions(radius),
        spacing: createOnyxiaMuiSpacing(spacing),
        typography: createOnyxiaMuiTypographyOptions(onyxia),
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

export function useOnyxiaTypography(): OnyxiaTypographySystem {
    return useTheme().onyxia.typography;
}

export function useOnyxiaSpacing(): OnyxiaSpacingSystem {
    return useTheme().onyxia.spacing;
}

export function useOnyxiaSizing(): OnyxiaSizingSystem {
    return useTheme().onyxia.sizing;
}

export function useOnyxiaRadius(): OnyxiaRadiusSystem {
    return useTheme().onyxia.radius;
}

export function useOnyxiaIconSystem(): OnyxiaIconSystem {
    return useTheme().onyxia.icon;
}
