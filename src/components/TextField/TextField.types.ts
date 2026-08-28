import type {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    ReactNode,
    Ref,
} from "react";

type DataAttributes = {
    [attributeName: `data-${string}`]: string | number | boolean | undefined;
};

type AriaAttributes = {
    [attributeName: `aria-${string}`]: string | number | boolean | undefined;
};

type PreventableKeyHandler = (params: {
    preventDefaultAndStopPropagation(): void;
}) => void;

export type TextFieldProps = DataAttributes &
    AriaAttributes & {
        className?: string;
        id?: string;
        name?: string;
        label?: ReactNode;
        placeholder?: string;
        value?: string;
        /** Mirrors the legacy behavior: updating `defaultValue` also refreshes the uncontrolled value. */
        defaultValue?: string;
        helperText?: ReactNode;
        helperTextError?: ReactNode;
        /** Preferred error prop. */
        error?: boolean;
        /** Legacy compatibility alias for `error`. */
        isErrored?: boolean;
        disabled?: boolean;
        required?: boolean;
        readOnly?: boolean;
        fullWidth?: boolean;
        type?: HTMLInputTypeAttribute | "sensitive";
        autoComplete?:
            | "on"
            | "off"
            | "name"
            | "honorific-prefix"
            | "given-name"
            | "additional-name"
            | "family-name"
            | "honorific-suffix"
            | "nickname"
            | "email"
            | "username"
            | "new-password"
            | "current-password"
            | "one-time-code"
            | "organization-title"
            | "organization"
            | "street-address"
            | "address-line1"
            | "address-line2"
            | "address-line3"
            | "address-level4"
            | "address-level3"
            | "address-level2"
            | "address-level1"
            | "country"
            | "country-name"
            | "postal-code"
            | "cc-name"
            | "cc-given-name"
            | "cc-additional-name"
            | "cc-family-name"
            | "cc-number"
            | "cc-exp"
            | "cc-exp-month"
            | "cc-exp-year"
            | "cc-csc"
            | "cc-type"
            | "transaction-currency"
            | "transaction-amount"
            | "language"
            | "bday"
            | "bday-day"
            | "bday-month"
            | "bday-year"
            | "sex"
            | "tel"
            | "tel-country-code"
            | "tel-national"
            | "tel-area-code"
            | "tel-local"
            | "tel-extension"
            | "impp"
            | "url"
            | "photo";
        multiline?: boolean;
        /** Legacy compatibility alias for `multiline`. */
        doRenderAsTextArea?: boolean;
        rows?: number;
        minRows?: number;
        maxRows?: number;
        onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onEscapeKeyDown?: PreventableKeyHandler;
        onEnterKeyDown?: PreventableKeyHandler;
        selectAllTextOnFocus?: boolean;
        isCircularProgressShown?: boolean;
        InputProps_endAdornment?: ReactNode;
        inputProps_ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
        "inputProps_aria-label"?: string;
        inputProps_className?: string;
        inputProps_tabIndex?: number;
        inputProps_spellCheck?: boolean;
        inputProps_autoFocus?: boolean;
    };
