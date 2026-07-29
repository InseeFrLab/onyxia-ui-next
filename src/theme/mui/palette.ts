import type { ThemeOptions } from "@mui/material/styles";
import type { OnyxiaColorSystem } from "../colorSystem";

export function createOnyxiaMuiPaletteOptions(
    colorSystem: OnyxiaColorSystem,
): ThemeOptions["palette"] {
    const { colorMode } = colorSystem;
    const { values } = colorSystem.semantic;

    return {
        mode: colorMode,
        primary: {
            main: values["usecases/surface/surface-action-primary"],
            light: values["usecases/surface/surface-action-primary-hover"],
            dark: values["usecases/surface/surface-action-primary-pressed"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        secondary: {
            main: values["usecases/surface/surface-action-secondary"],
            light: values["usecases/surface/surface-action-secondary-hover"],
            dark: values["usecases/surface/surface-action-secondary-pressed"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        error: {
            main: values["usecases/surface/surface-action-danger"],
            light: values["usecases/surface/surface-action-danger"],
            dark: values["usecases/surface/surface-action-danger"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        success: {
            main: values["usecases/surface/surface-action-success"],
            light: values["usecases/surface/surface-action-success"],
            dark: values["usecases/surface/surface-action-success"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        warning: {
            main: values["usecases/surface/surface-action-warning"],
            light: values["usecases/surface/surface-action-warning"],
            dark: values["usecases/surface/surface-action-warning"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        info: {
            main: values["usecases/surface/surface-action-info"],
            light: values["usecases/surface/surface-action-info"],
            dark: values["usecases/surface/surface-action-info"],
            contrastText: values["usecases/contents/content-inverse"],
        },
        text: {
            primary: values["usecases/contents/content-primary"],
            secondary: values["usecases/contents/content-secondary"],
            disabled: values["usecases/contents/content-disabled"],
        },
        divider: values["usecases/borders/border-neutral-primary"],
        background: {
            default: values["usecases/backgrounds/background"],
            paper: values["usecases/surface/surface-primary"],
        },
        action: {
            active: values["usecases/contents/content-primary"],
            hover: values["usecases/surface/surface-hover"],
            selected: values["usecases/surface/surface-selected"],
            disabled: values["usecases/contents/content-disabled"],
            disabledBackground: values["usecases/surface/surface-tertiary"],
            focus: values["usecases/surface/surface-focus"],
        },
    };
}
