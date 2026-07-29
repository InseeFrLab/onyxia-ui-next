import type { Components } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { OnyxiaColorSystem } from "../colorSystem";

type ButtonSemanticState = {
    background: string;
    hover: string;
    pressed: string;
};

function getContainedButtonState(
    onyxia: OnyxiaColorSystem,
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
    onyxia: OnyxiaColorSystem,
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

export function createOnyxiaMuiComponentOverrides(
    onyxia: OnyxiaColorSystem,
): Components<Theme> {
    return {
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
                        backgroundColor: state.background,
                        color: contrastText,
                        boxShadow: "none",
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
                        backgroundColor: state.background,
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
    };
}
