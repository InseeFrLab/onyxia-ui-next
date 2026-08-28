import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useTheme, type Theme } from "@mui/material/styles";
import CancelFilledIcon from "@mui/icons-material/Cancel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { OnyxiaTypographyStyle } from "../../theme";
import { Icon } from "../Icon";
import type { TextFieldProps } from "./TextField.types";

type SimulatedState = "hover" | "focus" | "filled" | undefined;

function assignRef<T>(ref: React.Ref<T> | undefined, value: T): void {
    if (ref === undefined || ref === null) {
        return;
    }

    if (typeof ref === "function") {
        ref(value);
        return;
    }

    (ref as React.MutableRefObject<T>).current = value;
}

function resolveTextFieldType(params: {
    type: TextFieldProps["type"];
    isValueHidden: boolean;
}): React.InputHTMLAttributes<unknown>["type"] {
    const { type = "text", isValueHidden } = params;

    switch (type) {
        case "password":
        case "sensitive":
            return isValueHidden ? "password" : "text";
        default:
            return type;
    }
}

function getInputTypography(params: {
    theme: Theme;
    hasValue: boolean;
    simulatedState: SimulatedState;
    disabled: boolean;
    error: boolean;
}): OnyxiaTypographyStyle {
    const { theme, hasValue, simulatedState, disabled, error } = params;

    if (disabled || error) {
        return theme.onyxia.typography.styles.body.md;
    }

    if (hasValue || simulatedState === "filled" || simulatedState === "focus") {
        return theme.onyxia.typography.styles.label.md.default;
    }

    return theme.onyxia.typography.styles.body.md;
}

function getTextFieldContainerStyles(theme: Theme): Record<string, unknown> {
    const semantic = theme.onyxia.semantic.values;

    return {
        display: "grid",
        gap: theme.onyxia.spacing.toCssValue("spacing-1"),
        "& .MuiOutlinedInput-root": {
            ...theme.onyxia.typography.toCssProperties(
                theme.onyxia.typography.styles.body.md,
            ),
            minHeight: "45px",
            borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
            backgroundColor: semantic["usecases/surface/surface-secondary"],
            transition: "background-color 120ms ease, border-color 120ms ease",
            color: semantic["usecases/contents/content-primary"],
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
            },
            "&.Mui-focused": {
                backgroundColor: semantic["usecases/surface/surface-secondary"],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: semantic["usecases/borders/border-focus"],
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                borderColor: semantic["usecases/borders/border-danger"],
            },
            "&.Mui-error:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: semantic["usecases/borders/border-danger"],
            },
            "&.Mui-disabled": {
                backgroundColor: semantic["usecases/surface/surface-secondary"],
                color: semantic["usecases/contents/content-disabled"],
            },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
            },
        },
        "&:not([data-read-only='true']) .MuiOutlinedInput-root:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error), &[data-simulated-state='hover'] .MuiOutlinedInput-root:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)":
            {
                backgroundColor: semantic["usecases/surface/surface-tertiary"],
            },
        "&:focus-within .MuiOutlinedInput-root:not(.Mui-disabled):not(.Mui-error), &[data-simulated-state='focus'] .MuiOutlinedInput-root:not(.Mui-disabled):not(.Mui-error)":
            {
                backgroundColor: semantic["usecases/surface/surface-secondary"],
            },
        "& .MuiOutlinedInput-input, & .MuiOutlinedInput-inputMultiline": {
            minWidth: 0,
            padding: theme.onyxia.spacing.toCssInset({
                topBottom: "spacing-2",
                rightLeft: "spacing-3",
            }),
            color: semantic["usecases/contents/content-primary"],
            "&::placeholder": {
                color: semantic["usecases/contents/content-secondary"],
                opacity: 1,
            },
            "&:-webkit-autofill": {
                WebkitTextFillColor:
                    semantic["usecases/contents/content-primary"],
                WebkitBoxShadow: `0 0 0 1000px ${semantic["usecases/surface/surface-secondary"]} inset`,
            },
        },
        "& .MuiOutlinedInput-input.Mui-disabled, & .MuiOutlinedInput-inputMultiline.Mui-disabled":
            {
                WebkitTextFillColor:
                    semantic["usecases/contents/content-disabled"],
            },
        "& .MuiOutlinedInput-adornedEnd": {
            paddingRight: theme.onyxia.spacing.toCssValue("spacing-3"),
        },
        "& .MuiInputAdornment-root": {
            marginLeft: theme.onyxia.spacing.toCssValue("spacing-4"),
            marginRight: 0,
            color: "inherit",
        },
    };
}

export const TextField = React.memo(
    React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
        (props, ref) => {
            const theme = useTheme();
            const {
                className,
                id,
                name,
                label,
                placeholder,
                value: valueProp,
                defaultValue = "",
                helperText,
                helperTextError,
                error = false,
                isErrored = false,
                disabled = false,
                required = false,
                readOnly = false,
                fullWidth = false,
                type = "text",
                autoComplete,
                multiline = false,
                doRenderAsTextArea = false,
                rows,
                minRows,
                maxRows,
                onChange,
                onBlur,
                onFocus,
                onEscapeKeyDown,
                onEnterKeyDown,
                selectAllTextOnFocus = false,
                isCircularProgressShown = false,
                InputProps_endAdornment,
                inputProps_ref,
                "inputProps_aria-label": inputPropsAriaLabel,
                inputProps_className,
                inputProps_tabIndex,
                inputProps_spellCheck,
                inputProps_autoFocus,
                ...rest
            } = props;
            const generatedId = React.useId();
            const htmlId = id ?? `onyxia-text-field-${generatedId}`;
            const helperTextId = `${htmlId}-helper-text`;
            const isInErrorState = error || isErrored;
            const resolvedMultiline = multiline || doRenderAsTextArea;
            const dataAttributes = Object.fromEntries(
                Object.entries(rest).filter(([key]) => key.startsWith("data-")),
            );
            const ariaAttributes = Object.fromEntries(
                Object.entries(rest).filter(([key]) => key.startsWith("aria-")),
            );
            const simulatedState = dataAttributes["data-simulated-state"] as
                | SimulatedState
                | undefined;
            const isControlled = valueProp !== undefined;
            const [uncontrolledValue, setUncontrolledValue] =
                React.useState(defaultValue);
            const currentValue = isControlled ? valueProp : uncontrolledValue;
            const [isValueHidden, setIsValueHidden] = React.useState(true);

            React.useEffect(() => {
                if (!isControlled) {
                    setUncontrolledValue(defaultValue);
                }
            }, [defaultValue, isControlled]);

            const mergedRef = React.useCallback(
                (node: HTMLInputElement | HTMLTextAreaElement | null) => {
                    if (node === null) {
                        return;
                    }

                    assignRef(ref, node);
                    assignRef(inputProps_ref, node);
                },
                [inputProps_ref, ref],
            );

            const hasValue = currentValue.length > 0;
            const helperContent =
                isInErrorState && helperTextError !== undefined
                    ? helperTextError
                    : helperText;
            const showHelper = helperContent !== undefined;
            const actualInputType = resolveTextFieldType({
                type,
                isValueHidden,
            });
            const inputTypography = getInputTypography({
                theme,
                hasValue,
                simulatedState,
                disabled,
                error: isInErrorState,
            });
            const helperColor = isInErrorState
                ? theme.onyxia.semantic.values[
                      "usecases/contents/content-danger"
                  ]
                : disabled
                ? theme.onyxia.semantic.values[
                      "usecases/contents/content-disabled"
                  ]
                : theme.onyxia.semantic.values[
                      "usecases/contents/content-tertiary"
                  ];
            const labelColor = isInErrorState
                ? theme.onyxia.semantic.values[
                      "usecases/contents/content-danger"
                  ]
                : disabled
                ? theme.onyxia.semantic.values[
                      "usecases/contents/content-disabled"
                  ]
                : theme.onyxia.semantic.values[
                      "usecases/contents/content-primary"
                  ];

            const handleKeyDown = React.useCallback<
                React.KeyboardEventHandler<
                    HTMLInputElement | HTMLTextAreaElement
                >
            >(
                event => {
                    const preventDefaultAndStopPropagation = () => {
                        event.preventDefault();
                        event.stopPropagation();
                    };

                    switch (event.key) {
                        case "Escape":
                            onEscapeKeyDown?.({
                                preventDefaultAndStopPropagation,
                            });
                            return;
                        case "Enter":
                            if (!resolvedMultiline) {
                                onEnterKeyDown?.({
                                    preventDefaultAndStopPropagation,
                                });
                            }
                            return;
                        default:
                            return;
                    }
                },
                [onEnterKeyDown, onEscapeKeyDown, resolvedMultiline],
            );

            const handleFocus = React.useCallback<
                React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
            >(
                event => {
                    if (selectAllTextOnFocus) {
                        event.target.setSelectionRange(
                            0,
                            event.target.value.length,
                        );
                    }

                    onFocus?.(event);
                },
                [onFocus, selectAllTextOnFocus],
            );

            const handleBlur = React.useCallback<
                React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
            >(
                event => {
                    onBlur?.(event);
                },
                [onBlur],
            );

            const handleChange = React.useCallback<
                React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
            >(
                event => {
                    if (!isControlled) {
                        setUncontrolledValue(event.target.value);
                    }

                    onChange?.(event);
                },
                [isControlled, onChange],
            );

            const endAdornment = (() => {
                if (InputProps_endAdornment !== undefined) {
                    return (
                        <InputAdornment position="end">
                            {InputProps_endAdornment}
                        </InputAdornment>
                    );
                }

                if (isCircularProgressShown) {
                    return (
                        <InputAdornment position="end">
                            <CircularProgress
                                size={theme.onyxia.sizing.get("size-5")}
                                sx={{
                                    color: theme.onyxia.semantic.values[
                                        "usecases/contents/content-secondary"
                                    ],
                                }}
                            />
                        </InputAdornment>
                    );
                }

                if (type !== "password" && type !== "sensitive") {
                    return undefined;
                }

                return (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                isValueHidden
                                    ? "Show field value"
                                    : "Hide field value"
                            }
                            edge="end"
                            onClick={() => {
                                setIsValueHidden(current => !current);
                            }}
                            onMouseDown={event => {
                                event.preventDefault();
                            }}
                            disabled={disabled}
                            sx={{
                                width: theme.onyxia.sizing.toCssValue("size-6"),
                                height: theme.onyxia.sizing.toCssValue(
                                    "size-6",
                                ),
                                padding: 0,
                                color: disabled
                                    ? theme.onyxia.semantic.values[
                                          "usecases/contents/content-disabled"
                                      ]
                                    : theme.onyxia.semantic.values[
                                          "usecases/contents/content-primary"
                                      ],
                            }}
                        >
                            <Icon
                                decorative
                                icon={
                                    isValueHidden
                                        ? VisibilityOutlinedIcon
                                        : VisibilityOffOutlinedIcon
                                }
                                size="icon-size-4"
                            />
                        </IconButton>
                    </InputAdornment>
                );
            })();

            return (
                <FormControl
                    className={className}
                    disabled={disabled}
                    error={isInErrorState}
                    fullWidth={fullWidth}
                    required={required}
                    sx={getTextFieldContainerStyles(theme)}
                    {...dataAttributes}
                    data-read-only={readOnly}
                >
                    {label !== undefined && (
                        <FormLabel
                            htmlFor={htmlId}
                            sx={{
                                ...theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.label.md
                                        .default,
                                ),
                                color: labelColor,
                                margin: 0,
                            }}
                        >
                            {label}
                        </FormLabel>
                    )}
                    <OutlinedInput
                        autoComplete={autoComplete}
                        endAdornment={endAdornment}
                        id={htmlId}
                        inputProps={{
                            ...ariaAttributes,
                            "aria-describedby": showHelper
                                ? helperTextId
                                : undefined,
                            "aria-invalid": isInErrorState || undefined,
                            "aria-label":
                                label === undefined
                                    ? inputPropsAriaLabel
                                    : undefined,
                            autoFocus: inputProps_autoFocus,
                            className: inputProps_className,
                            readOnly,
                            spellCheck: inputProps_spellCheck,
                            tabIndex: inputProps_tabIndex,
                        }}
                        inputRef={mergedRef}
                        maxRows={maxRows}
                        minRows={minRows}
                        multiline={resolvedMultiline}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={rows}
                        sx={{
                            "& .MuiOutlinedInput-input, & .MuiOutlinedInput-inputMultiline":
                                {
                                    ...theme.onyxia.typography.toCssProperties(
                                        inputTypography,
                                    ),
                                    color: disabled
                                        ? theme.onyxia.semantic.values[
                                              "usecases/contents/content-disabled"
                                          ]
                                        : theme.onyxia.semantic.values[
                                              "usecases/contents/content-primary"
                                          ],
                                    cursor: readOnly ? "default" : undefined,
                                },
                        }}
                        type={resolvedMultiline ? undefined : actualInputType}
                        value={currentValue}
                    />
                    {showHelper && (
                        <FormHelperText
                            id={helperTextId}
                            sx={{
                                margin: 0,
                                color: helperColor,
                            }}
                        >
                            <Stack
                                alignItems="center"
                                component="span"
                                direction="row"
                                spacing={1}
                            >
                                {isInErrorState && (
                                    <Icon
                                        decorative
                                        icon={CancelFilledIcon}
                                        size="icon-size-2"
                                        sx={{ color: "inherit" }}
                                    />
                                )}
                                {helperContent}
                                {!isInErrorState && (
                                    <Icon
                                        decorative
                                        icon={InfoOutlinedIcon}
                                        size="icon-size-2"
                                        sx={{ color: "inherit" }}
                                    />
                                )}
                            </Stack>
                        </FormHelperText>
                    )}
                </FormControl>
            );
        },
    ),
);

TextField.displayName = "TextField";
