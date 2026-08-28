import React from "react";
import MuiButton from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type {
    OnyxiaIconSizeTokenName,
    OnyxiaTypographyStyle,
} from "../../theme";
import { Icon } from "../Icon";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

type ResolvedButtonVariant = "primary" | "secondary" | "tertiary" | "text";

type ButtonSizeDefinition = {
    iconSize: OnyxiaIconSizeTokenName;
    gap: "spacing-1" | "spacing-2";
    paddingX: "spacing-3" | "spacing-4";
    paddingY: "spacing-1" | "spacing-2";
    typography: OnyxiaTypographyStyle;
};

type ButtonVisualDefinition = {
    color: string;
    backgroundColor: string;
    hover: {
        color: string;
        backgroundColor: string;
    };
    pressed: {
        color: string;
        backgroundColor: string;
        boxShadow: string;
    };
};

function capitalizeText(value: string): string {
    if (value.length === 0) {
        return value;
    }

    return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function resolveButtonVariant(
    variant: ButtonVariant | undefined,
): ResolvedButtonVariant {
    switch (variant) {
        case "secondary":
            return "secondary";
        case "ternary":
        case "tertiary":
            return "tertiary";
        case "text":
            return "text";
        case "primary":
        default:
            return "primary";
    }
}

function getButtonFocusRing(theme: Theme): string {
    return `0 0 0 4px ${theme.onyxia.semantic.values["usecases/borders/border-focus-low"]}`;
}

function getPressedButtonShadow(theme: Theme): string {
    return `0 2px 4px 0 ${theme.onyxia.semantic.values["usecases/shadow/shadow-color-1"]}`;
}

function getButtonSizeDefinition(
    theme: Theme,
    size: ButtonSize,
): ButtonSizeDefinition {
    switch (size) {
        case "small":
            return {
                iconSize: "icon-size-2",
                gap: "spacing-1",
                paddingX: "spacing-3",
                paddingY: "spacing-1",
                typography: theme.onyxia.typography.styles.label.sm,
            };
        case "large":
            return {
                iconSize: "icon-size-4",
                gap: "spacing-2",
                paddingX: "spacing-4",
                paddingY: "spacing-2",
                typography: theme.onyxia.typography.styles.label.lg,
            };
        case "medium":
        default:
            return {
                iconSize: "icon-size-3",
                gap: "spacing-2",
                paddingX: "spacing-4",
                paddingY: "spacing-2",
                typography: theme.onyxia.typography.styles.label.md.default,
            };
    }
}

function getButtonVisualDefinition(
    theme: Theme,
    variant: ResolvedButtonVariant,
): ButtonVisualDefinition {
    const semantic = theme.onyxia.semantic.values;
    const inverse = semantic["usecases/contents/content-inverse"];
    const primary = semantic["usecases/contents/content-primary"];
    const secondary = semantic["usecases/contents/content-secondary"];
    const focus = semantic["usecases/contents/content-focus"];
    const pressedShadow = getPressedButtonShadow(theme);

    switch (variant) {
        case "secondary":
            return {
                color: inverse,
                backgroundColor:
                    semantic["usecases/surface/surface-action-secondary"],
                hover: {
                    color: inverse,
                    backgroundColor:
                        semantic[
                            "usecases/surface/surface-action-secondary-hover"
                        ],
                },
                pressed: {
                    color: inverse,
                    backgroundColor:
                        semantic[
                            "usecases/surface/surface-action-secondary-pressed"
                        ],
                    boxShadow: pressedShadow,
                },
            };
        case "tertiary":
            return {
                color: primary,
                backgroundColor: semantic["usecases/surface/surface-tertiary"],
                hover: {
                    color: primary,
                    backgroundColor: semantic["usecases/surface/surface-hover"],
                },
                pressed: {
                    color: primary,
                    backgroundColor: semantic["usecases/surface/surface-hover"],
                    boxShadow: pressedShadow,
                },
            };
        case "text":
            return {
                color: secondary,
                backgroundColor: "transparent",
                hover: {
                    color: primary,
                    backgroundColor: semantic["usecases/surface/surface-hover"],
                },
                pressed: {
                    color: focus,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                },
            };
        case "primary":
        default:
            return {
                color: inverse,
                backgroundColor:
                    semantic["usecases/surface/surface-action-primary"],
                hover: {
                    color: inverse,
                    backgroundColor:
                        semantic[
                            "usecases/surface/surface-action-primary-hover"
                        ],
                },
                pressed: {
                    color: inverse,
                    backgroundColor:
                        semantic[
                            "usecases/surface/surface-action-primary-pressed"
                        ],
                    boxShadow: pressedShadow,
                },
            };
    }
}

function resolveTarget(params: {
    href: string | undefined;
    doOpenNewTabIfHref: boolean | undefined;
    target: string | undefined;
}): string | undefined {
    const { href, doOpenNewTabIfHref, target } = params;

    if (doOpenNewTabIfHref !== undefined && href !== undefined) {
        return doOpenNewTabIfHref ? "_blank" : undefined;
    }

    if (target !== undefined) {
        return target;
    }

    if (href === undefined || typeof window === "undefined") {
        return undefined;
    }

    try {
        return new URL(href).origin === window.location.origin
            ? undefined
            : "_blank";
    } catch {
        return undefined;
    }
}

function resolveRel(params: {
    target: string | undefined;
    rel: string | undefined;
}): string | undefined {
    const { target, rel } = params;

    if (target !== "_blank") {
        return rel;
    }

    return rel ?? "noopener noreferrer";
}

export const Button = React.memo(
    React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
        const theme = useTheme();
        const {
            className,
            variant = "primary",
            size = "medium",
            disabled = false,
            children,
            startIcon,
            endIcon,
            autoFocus = false,
            tabIndex,
            name,
            htmlId,
            ...rest
        } = props;
        const resolvedVariant = resolveButtonVariant(variant);
        const sizeDefinition = getButtonSizeDefinition(theme, size);
        const visualDefinition = getButtonVisualDefinition(
            theme,
            resolvedVariant,
        );
        const gap = theme.onyxia.spacing.toCssValue(sizeDefinition.gap);
        const focusRing = getButtonFocusRing(theme);
        const dataAndAriaProps = Object.fromEntries(
            Object.entries(rest).filter(
                ([key]) => key.startsWith("data-") || key.startsWith("aria-"),
            ),
        );
        const nativeButtonProps = (() => {
            if ("type" in props && props.type === "submit") {
                return {
                    type: props.type,
                };
            }

            const { href, onClick, doOpenNewTabIfHref, target, rel, type } =
                props;
            const resolvedTarget = resolveTarget({
                href,
                doOpenNewTabIfHref,
                target,
            });

            return {
                href,
                onClick,
                target: resolvedTarget,
                rel: resolveRel({ target: resolvedTarget, rel }),
                type,
            };
        })();
        const normalizedChildren =
            typeof children === "string" ? capitalizeText(children) : children;

        return (
            <MuiButton
                ref={ref}
                className={className}
                variant={resolvedVariant === "text" ? "text" : "contained"}
                color="inherit"
                disableElevation
                disabled={disabled}
                autoFocus={autoFocus}
                tabIndex={tabIndex}
                name={name}
                id={htmlId}
                startIcon={
                    startIcon === undefined ? undefined : (
                        <Icon
                            icon={startIcon}
                            size={sizeDefinition.iconSize}
                            decorative
                        />
                    )
                }
                endIcon={
                    endIcon === undefined ? undefined : (
                        <Icon
                            icon={endIcon}
                            size={sizeDefinition.iconSize}
                            decorative
                        />
                    )
                }
                {...dataAndAriaProps}
                {...nativeButtonProps}
                sx={{
                    ...theme.onyxia.typography.toCssProperties(
                        sizeDefinition.typography,
                    ),
                    minWidth: 0,
                    border: 0,
                    borderRadius: theme.onyxia.radius.toCssValue("radius-full"),
                    padding: theme.onyxia.spacing.toCssInset({
                        topBottom: sizeDefinition.paddingY,
                        rightLeft: sizeDefinition.paddingX,
                    }),
                    gap,
                    color: visualDefinition.color,
                    backgroundColor: visualDefinition.backgroundColor,
                    boxShadow: "none",
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                        margin: 0,
                        color: "inherit",
                    },
                    "&:hover": {
                        color: visualDefinition.hover.color,
                        backgroundColor: visualDefinition.hover.backgroundColor,
                        boxShadow: "none",
                    },
                    "&:active": {
                        color: visualDefinition.pressed.color,
                        backgroundColor:
                            visualDefinition.pressed.backgroundColor,
                        boxShadow: visualDefinition.pressed.boxShadow,
                    },
                    "&.Mui-focusVisible": {
                        boxShadow: focusRing,
                    },
                    "&.Mui-disabled": {
                        opacity: 0.3,
                        color: visualDefinition.color,
                        backgroundColor: visualDefinition.backgroundColor,
                        boxShadow: "none",
                    },
                    '&[data-simulated-state="hover"]': {
                        color: visualDefinition.hover.color,
                        backgroundColor: visualDefinition.hover.backgroundColor,
                        boxShadow: "none",
                    },
                    '&[data-simulated-state="pressed"]': {
                        color: visualDefinition.pressed.color,
                        backgroundColor:
                            visualDefinition.pressed.backgroundColor,
                        boxShadow: visualDefinition.pressed.boxShadow,
                    },
                    '&[data-simulated-state="focus"]': {
                        boxShadow: focusRing,
                    },
                }}
            >
                {normalizedChildren}
            </MuiButton>
        );
    }),
);

Button.displayName = "Button";
