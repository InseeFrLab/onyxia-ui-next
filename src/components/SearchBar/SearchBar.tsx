import React from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Icon } from "../Icon";
import type { SearchBarKey, SearchBarProps } from "./SearchBar.types";

type SearchBarSimulatedState =
    | "hover"
    | "active"
    | "active-has-value"
    | undefined;

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

function getSearchBarBoxShadow(params: {
    simulatedState: SearchBarSimulatedState;
    isHovered: boolean;
    active: boolean;
    shadowColor: string;
}): string {
    const { simulatedState, isHovered, active, shadowColor } = params;

    if (simulatedState === "hover" || isHovered) {
        return `0 4px 8px 0 ${shadowColor}`;
    }

    if (
        active ||
        simulatedState === "active" ||
        simulatedState === "active-has-value"
    ) {
        return `0 2px 4px 0 ${shadowColor}`;
    }

    return `0 2px 4px 0 ${shadowColor}`;
}

export const SearchBar = React.memo(
    React.forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
        const theme = useTheme();
        const {
            className,
            search,
            onSearchChange,
            value: valueProp,
            defaultValue = "",
            onChange,
            onFocus,
            onBlur,
            id,
            name,
            disabled = false,
            readOnly = false,
            autoFocus = false,
            placeholder = "Search",
            clearButtonAriaLabel,
            restorableSearch,
            onKeyPress,
            inputRef,
            ...rest
        } = props;
        const generatedId = React.useId();
        const htmlId = id ?? `onyxia-search-bar-${generatedId}`;
        const dataAttributes = Object.fromEntries(
            Object.entries(rest).filter(([key]) => key.startsWith("data-")),
        );
        const ariaAttributes = Object.fromEntries(
            Object.entries(rest).filter(([key]) => key.startsWith("aria-")),
        );
        const simulatedState = dataAttributes["data-simulated-state"] as
            | SearchBarSimulatedState
            | undefined;
        const ariaLabel = ariaAttributes["aria-label"];
        const resolvedValueProp = search ?? valueProp;
        const isControlled = resolvedValueProp !== undefined;
        const [uncontrolledValue, setUncontrolledValue] =
            React.useState(defaultValue);
        const currentValue = isControlled
            ? resolvedValueProp
            : uncontrolledValue;
        const [isActive, setIsActive] = React.useState(
            autoFocus || currentValue !== "",
        );
        const [isHovered, setIsHovered] = React.useState(false);
        const inputElementRef = React.useRef<HTMLInputElement | null>(null);

        React.useEffect(() => {
            if (!isControlled) {
                setUncontrolledValue(defaultValue);
            }
        }, [defaultValue, isControlled]);

        React.useEffect(() => {
            if (currentValue !== "") {
                setIsActive(true);
            }
        }, [currentValue]);

        React.useEffect(() => {
            if (!autoFocus || disabled) {
                return;
            }

            const input = inputElementRef.current;

            if (input === null) {
                return;
            }

            input.focus();
            setIsActive(true);
        }, [autoFocus, disabled]);

        const setMergedRef = React.useCallback(
            (node: HTMLInputElement | null) => {
                inputElementRef.current = node;

                if (node === null) {
                    return;
                }

                assignRef(ref, node);
                assignRef(inputRef, node);
            },
            [inputRef, ref],
        );

        const resolveAndEmitChange = React.useCallback(
            (nextValue: string) => {
                if (!isControlled) {
                    setUncontrolledValue(nextValue);
                }

                onSearchChange?.(nextValue);
            },
            [isControlled, onSearchChange],
        );

        const focusInput = React.useCallback(
            (params?: { selectAll?: boolean }) => {
                if (disabled) {
                    return;
                }

                const input = inputElementRef.current;

                if (input === null) {
                    return;
                }

                input.focus();

                if (params?.selectAll) {
                    input.setSelectionRange(0, input.value.length);
                }
            },
            [disabled],
        );

        const activate = React.useCallback(() => {
            if (disabled) {
                return;
            }

            setIsActive(true);
            focusInput();
        }, [disabled, focusInput]);

        const deactivateIfEmpty = React.useCallback(() => {
            if (restorableSearch !== undefined) {
                return;
            }

            if (currentValue === "") {
                setIsActive(false);
            }
        }, [currentValue, restorableSearch]);

        const restoreSearch = React.useCallback(() => {
            if (restorableSearch === undefined) {
                resolveAndEmitChange("");
                setIsActive(false);
                return;
            }

            resolveAndEmitChange(restorableSearch);
            setIsActive(restorableSearch !== "");
        }, [resolveAndEmitChange, restorableSearch]);

        const handleClear = React.useCallback(() => {
            if (disabled || readOnly) {
                return;
            }

            resolveAndEmitChange("");

            if (restorableSearch === undefined) {
                setIsActive(false);
                inputElementRef.current?.blur();
                return;
            }

            focusInput();
        }, [
            disabled,
            focusInput,
            readOnly,
            resolveAndEmitChange,
            restorableSearch,
        ]);

        const emitKeyPress = React.useCallback(
            (key: SearchBarKey) => {
                window.setTimeout(() => {
                    onKeyPress?.(key);
                }, 50);
            },
            [onKeyPress],
        );

        const handleInputKeyDown = React.useCallback<
            React.KeyboardEventHandler<HTMLInputElement>
        >(
            event => {
                switch (event.key) {
                    case "Enter":
                        if (currentValue === "") {
                            setIsActive(false);
                        }

                        inputElementRef.current?.blur();
                        emitKeyPress("Enter");
                        return;
                    case "Escape":
                        restoreSearch();
                        inputElementRef.current?.blur();
                        emitKeyPress("Escape");
                        return;
                    default:
                        return;
                }
            },
            [currentValue, emitKeyPress, restoreSearch],
        );

        const handleInputChange = React.useCallback<
            React.ChangeEventHandler<HTMLInputElement>
        >(
            event => {
                if (!isControlled) {
                    setUncontrolledValue(event.target.value);
                }

                onSearchChange?.(event.target.value);
                onChange?.(event);
            },
            [isControlled, onChange, onSearchChange],
        );

        const handleBlur = React.useCallback<
            React.FocusEventHandler<HTMLInputElement>
        >(
            event => {
                if (
                    restorableSearch !== undefined &&
                    currentValue !== restorableSearch
                ) {
                    resolveAndEmitChange(restorableSearch);
                    setIsActive(restorableSearch !== "");
                } else {
                    deactivateIfEmpty();
                }

                onBlur?.(event);
            },
            [
                currentValue,
                deactivateIfEmpty,
                onBlur,
                resolveAndEmitChange,
                restorableSearch,
            ],
        );

        const handleFocus = React.useCallback<
            React.FocusEventHandler<HTMLInputElement>
        >(
            event => {
                setIsActive(true);
                onFocus?.(event);
            },
            [onFocus],
        );

        const semantic = theme.onyxia.semantic.values;
        const isForcedActive =
            simulatedState === "active" ||
            simulatedState === "active-has-value";
        const isActiveWithValue =
            simulatedState === "active-has-value" || currentValue !== "";
        const isVisuallyActive =
            !disabled && (isActive || isForcedActive || isActiveWithValue);
        const leadingColor = disabled
            ? semantic["usecases/contents/content-disabled"]
            : isVisuallyActive
            ? semantic["usecases/contents/content-focus"]
            : semantic["usecases/contents/content-primary"];
        const inputColor = disabled
            ? semantic["usecases/contents/content-disabled"]
            : isActiveWithValue
            ? semantic["usecases/contents/content-primary"]
            : semantic["usecases/contents/content-secondary"];
        const placeholderColor = disabled
            ? semantic["usecases/contents/content-disabled"]
            : isVisuallyActive
            ? semantic["usecases/contents/content-secondary"]
            : semantic["usecases/contents/content-primary"];
        const placeholderTypography = isVisuallyActive
            ? theme.onyxia.typography.styles.label.md.bold
            : theme.onyxia.typography.styles.label.md.default;
        const boxShadow = getSearchBarBoxShadow({
            simulatedState,
            isHovered: !isVisuallyActive && isHovered,
            active: isVisuallyActive,
            shadowColor: semantic["usecases/shadow/shadow-color-1"],
        });
        const showBottomBorder =
            !disabled &&
            !isVisuallyActive &&
            (simulatedState === "hover" || isHovered);
        const showClearAction =
            !disabled &&
            !readOnly &&
            (isVisuallyActive || simulatedState === "active-has-value");
        const resolvedAccessibleName =
            typeof ariaLabel === "string" && ariaLabel.trim() !== ""
                ? ariaLabel
                : placeholder;

        return (
            <Stack
                alignItems="center"
                className={className}
                direction="row"
                onClick={activate}
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                }}
                spacing={2}
                sx={{
                    minHeight: theme.onyxia.sizing.toCssValue("size-8"),
                    width: "100%",
                    padding: theme.onyxia.spacing.toCssInset({
                        topBottom: "spacing-2",
                        rightLeft: "spacing-4",
                    }),
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    backgroundColor:
                        semantic["usecases/surface/surface-primary"],
                    boxShadow,
                    borderBottom: showBottomBorder
                        ? `2px solid ${semantic["usecases/borders/border-focus"]}`
                        : "2px solid transparent",
                    cursor: disabled ? "default" : "text",
                }}
                {...dataAttributes}
                data-active={isVisuallyActive}
                data-disabled={disabled}
            >
                <Icon
                    decorative
                    icon={SearchOutlinedIcon}
                    size="icon-size-4"
                    sx={{
                        color: leadingColor,
                        cursor: disabled ? "default" : "pointer",
                    }}
                    onClick={event => {
                        event.stopPropagation();
                        focusInput({ selectAll: isActiveWithValue });
                    }}
                />
                <InputBase
                    autoFocus={autoFocus}
                    disabled={disabled}
                    fullWidth
                    id={htmlId}
                    inputProps={{
                        ...ariaAttributes,
                        "aria-label": resolvedAccessibleName,
                        readOnly,
                        role: undefined,
                    }}
                    inputRef={setMergedRef}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyDown={handleInputKeyDown}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    type="search"
                    value={currentValue}
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        color: inputColor,
                        "& input": {
                            padding: 0,
                            minWidth: 0,
                            ...theme.onyxia.typography.toCssProperties(
                                theme.onyxia.typography.styles.label.md.bold,
                            ),
                            color: inputColor,
                            caretColor: disabled
                                ? inputColor
                                : semantic["usecases/contents/content-focus"],
                            "&::placeholder": {
                                ...theme.onyxia.typography.toCssProperties(
                                    placeholderTypography,
                                ),
                                color: placeholderColor,
                                opacity: 1,
                            },
                            "&::-webkit-search-cancel-button": {
                                WebkitAppearance: "none",
                                display: "none",
                            },
                            "&::-ms-clear": {
                                display: "none",
                            },
                        },
                    }}
                />
                {showClearAction && (
                    <IconButton
                        aria-label={
                            clearButtonAriaLabel ??
                            `Clear ${resolvedAccessibleName.toLowerCase()}`
                        }
                        disabled={disabled}
                        edge="end"
                        onClick={event => {
                            event.stopPropagation();
                            handleClear();
                        }}
                        onMouseDown={event => {
                            event.preventDefault();
                        }}
                        sx={{
                            width: theme.onyxia.sizing.toCssValue("size-6"),
                            height: theme.onyxia.sizing.toCssValue("size-6"),
                            padding: 0,
                            color: disabled
                                ? semantic["usecases/contents/content-disabled"]
                                : semantic["usecases/contents/content-primary"],
                        }}
                    >
                        <Icon decorative icon={CancelIcon} size="icon-size-4" />
                    </IconButton>
                )}
            </Stack>
        );
    }),
);

SearchBar.displayName = "SearchBar";
