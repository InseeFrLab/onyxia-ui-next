import type { Components } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { OnyxiaTheme } from "../theme";
import type { OnyxiaIconSizeTokenName } from "../iconSystem";
import type { OnyxiaSizingTokenName } from "../sizingSystem";

type ButtonSemanticState = {
    background: string;
    hover: string;
    pressed: string;
};

function getContainedButtonState(
    onyxia: OnyxiaTheme,
    color: "primary" | "secondary" | "error" | "success" | "warning" | "info",
): ButtonSemanticState {
    const { values } = onyxia.semantic;

    switch (color) {
        case "primary":
            return {
                background: values["usecases/surface/surface-action-primary"],
                hover: values["usecases/surface/surface-action-primary-hover"],
                pressed:
                    values["usecases/surface/surface-action-primary-pressed"],
            };
        case "secondary":
            return {
                background: values["usecases/surface/surface-action-secondary"],
                hover: values[
                    "usecases/surface/surface-action-secondary-hover"
                ],
                pressed:
                    values["usecases/surface/surface-action-secondary-pressed"],
            };
        case "error":
            return {
                background: values["usecases/surface/surface-action-danger"],
                hover: values["usecases/surface/surface-action-danger"],
                pressed: values["usecases/surface/surface-action-danger"],
            };
        case "success":
            return {
                background: values["usecases/surface/surface-action-success"],
                hover: values["usecases/surface/surface-action-success"],
                pressed: values["usecases/surface/surface-action-success"],
            };
        case "warning":
            return {
                background: values["usecases/surface/surface-action-warning"],
                hover: values["usecases/surface/surface-action-warning"],
                pressed: values["usecases/surface/surface-action-warning"],
            };
        case "info":
            return {
                background: values["usecases/surface/surface-action-info"],
                hover: values["usecases/surface/surface-action-info"],
                pressed: values["usecases/surface/surface-action-info"],
            };
        default:
            return {
                background: values["usecases/surface/surface-action-primary"],
                hover: values["usecases/surface/surface-action-primary-hover"],
                pressed:
                    values["usecases/surface/surface-action-primary-pressed"],
            };
    }
}

function getAlertSemanticState(
    onyxia: OnyxiaTheme,
    severity: "error" | "info" | "success" | "warning",
) {
    const { values } = onyxia.semantic;

    switch (severity) {
        case "error":
            return {
                background: values["usecases/surface/surface-contrast-danger"],
                border: values["usecases/borders/border-danger"],
                content: values["usecases/contents/content-danger"],
            };
        case "info":
            return {
                background: values["usecases/surface/surface-contrast-info"],
                border: values["usecases/borders/border-info"],
                content: values["usecases/contents/content-info"],
            };
        case "success":
            return {
                background: values["usecases/surface/surface-contrast-success"],
                border: values["usecases/borders/border-success"],
                content: values["usecases/contents/content-success"],
            };
        case "warning":
            return {
                background: values["usecases/surface/surface-contrast-warning"],
                border: values["usecases/borders/border-warning"],
                content: values["usecases/contents/content-warning"],
            };
    }
}

function getButtonFocusRing(theme: Theme) {
    return `0 0 0 4px ${theme.onyxia.semantic.values["usecases/borders/border-focus-low"]}`;
}

function getMuiSvgIconSizeToken(
    fontSize: "inherit" | "small" | "medium" | "large",
): OnyxiaIconSizeTokenName | null {
    switch (fontSize) {
        case "inherit":
            return null;
        case "small":
            return "icon-size-3";
        case "large":
            return "icon-size-5";
        case "medium":
        default:
            return "icon-size-4";
    }
}

function getMuiIconButtonSizing(size: "small" | "medium" | "large"): {
    box: OnyxiaSizingTokenName;
    icon: OnyxiaIconSizeTokenName;
} {
    switch (size) {
        case "small":
            return {
                box: "size-8",
                icon: "icon-size-3",
            };
        case "large":
            return {
                box: "size-10",
                icon: "icon-size-5",
            };
        case "medium":
        default:
            return {
                box: "size-9",
                icon: "icon-size-4",
            };
    }
}

export function createOnyxiaMuiComponentOverrides(
    onyxia: OnyxiaTheme,
): Components<Theme> {
    return {
        MuiSvgIcon: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const fontSize =
                        ownerState.fontSize === undefined
                            ? "medium"
                            : ownerState.fontSize;

                    if (
                        !["inherit", "small", "medium", "large"].includes(
                            fontSize,
                        )
                    ) {
                        return {};
                    }

                    const iconSizeToken = getMuiSvgIconSizeToken(
                        fontSize as Parameters<
                            typeof getMuiSvgIconSizeToken
                        >[0],
                    );

                    if (iconSizeToken === null) {
                        return {};
                    }

                    return {
                        fontSize: theme.onyxia.icon.toCssSize(iconSizeToken),
                    };
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const size =
                        ownerState.size === undefined
                            ? "medium"
                            : ownerState.size;

                    if (!["small", "medium", "large"].includes(size)) {
                        return {};
                    }

                    const sizing = getMuiIconButtonSizing(
                        size as Parameters<typeof getMuiIconButtonSizing>[0],
                    );

                    return {
                        width: theme.onyxia.sizing.toCssValue(sizing.box),
                        height: theme.onyxia.sizing.toCssValue(sizing.box),
                        padding: 0,
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-full"),
                        "& .MuiSvgIcon-root": {
                            fontSize: theme.onyxia.icon.toCssSize(sizing.icon),
                        },
                    };
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    if (ownerState.variant !== "contained") {
                        return {};
                    }

                    const color =
                        ownerState.color === undefined
                            ? "primary"
                            : ownerState.color;

                    if (
                        ![
                            "primary",
                            "secondary",
                            "error",
                            "success",
                            "warning",
                            "info",
                        ].includes(color)
                    ) {
                        return {};
                    }

                    const state = getContainedButtonState(
                        onyxia,
                        color as Parameters<typeof getContainedButtonState>[1],
                    );
                    const disabledBackground =
                        onyxia.semantic.values[
                            "usecases/surface/surface-tertiary"
                        ];
                    const disabledContent =
                        onyxia.semantic.values[
                            "usecases/contents/content-disabled"
                        ];
                    const contrastText =
                        onyxia.semantic.values[
                            "usecases/contents/content-inverse"
                        ];

                    return {
                        ...theme.onyxia.typography.toCssProperties(
                            theme.onyxia.typography.styles.label.md.default,
                        ),
                        backgroundColor: state.background,
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-full"),
                        color: contrastText,
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: state.hover,
                            boxShadow: "none",
                        },
                        "&:active": {
                            backgroundColor: state.pressed,
                            boxShadow: "none",
                        },
                        "&.Mui-focusVisible": {
                            backgroundColor: state.background,
                            boxShadow: getButtonFocusRing(theme),
                        },
                        "&.Mui-disabled": {
                            backgroundColor: disabledBackground,
                            color: disabledContent,
                            boxShadow: "none",
                        },
                        '&[data-simulated-state="hover"]': {
                            backgroundColor: state.hover,
                            boxShadow: "none",
                        },
                        '&[data-simulated-state="pressed"]': {
                            backgroundColor: state.pressed,
                            boxShadow: "none",
                        },
                        '&[data-simulated-state="focus"]': {
                            backgroundColor: state.background,
                            boxShadow: getButtonFocusRing(theme),
                        },
                    };
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.onyxia.typography.toCssProperties(
                        theme.onyxia.typography.styles.body.md,
                    ),
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-primary"
                    ],
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-neutral-primary"
                            ],
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-neutral-high"
                            ],
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-focus"
                            ],
                    },
                    "&.Mui-focused": {
                        boxShadow: `0 0 0 3px ${theme.onyxia.semantic.values["usecases/surface/surface-focus"]}`,
                    },
                    "&.Mui-disabled": {
                        backgroundColor:
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-tertiary"
                            ],
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-disabled"
                        ],
                    },
                    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-secondary"
                            ],
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-danger"
                            ],
                    },
                    "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-danger"
                            ],
                    },
                }),
                input: ({ theme }) => ({
                    ...theme.onyxia.typography.toCssProperties(
                        theme.onyxia.typography.styles.body.md,
                    ),
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-primary"
                    ],
                    "&::placeholder": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-tertiary"
                        ],
                        opacity: 1,
                    },
                    "&.Mui-disabled": {
                        WebkitTextFillColor:
                            theme.onyxia.semantic.values[
                                "usecases/contents/content-disabled"
                            ],
                    },
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.onyxia.typography.toCssProperties(
                        theme.onyxia.typography.styles.label.sm,
                    ),
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-secondary"
                    ],
                    "&.Mui-focused": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-focus"
                        ],
                    },
                    "&.Mui-error": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-danger"
                        ],
                    },
                    "&.Mui-disabled": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-disabled"
                        ],
                    },
                }),
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: ({ theme }) => ({
                    ...theme.onyxia.typography.toCssProperties(
                        theme.onyxia.typography.styles.caption.md,
                    ),
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-secondary"
                    ],
                    "&.Mui-error": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-danger"
                        ],
                    },
                    "&.Mui-disabled": {
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-disabled"
                        ],
                    },
                }),
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const severity =
                        ownerState.severity === undefined
                            ? "success"
                            : ownerState.severity;

                    if (
                        !["error", "info", "success", "warning"].includes(
                            severity,
                        )
                    ) {
                        return {};
                    }

                    const state = getAlertSemanticState(
                        theme.onyxia,
                        severity as Parameters<typeof getAlertSemanticState>[1],
                    );

                    return {
                        ...theme.onyxia.typography.toCssProperties(
                            theme.onyxia.typography.styles.body.md,
                        ),
                        backgroundColor: state.background,
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-2"),
                        border: `1px solid ${state.border}`,
                        color: state.content,
                        "& .MuiAlert-icon": {
                            color: state.content,
                        },
                        "& .MuiAlert-message": {
                            color: state.content,
                        },
                    };
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.onyxia.radius.toCssValue("radius-full"),
                }),
            },
        },
    };
}
