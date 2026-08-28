import type { ChangeEventHandler, FocusEventHandler, Ref } from "react";

type DataAttributes = {
    [attributeName: `data-${string}`]: string | number | boolean | undefined;
};

type AriaAttributes = {
    [attributeName: `aria-${string}`]: string | number | boolean | undefined;
};

export type SearchBarKey = "Enter" | "Escape";

export type SearchBarProps = DataAttributes &
    AriaAttributes & {
        className?: string;
        /** Legacy controlled value prop from `onyxia-ui`. */
        search?: string;
        /** Legacy controlled change callback from `onyxia-ui`. */
        onSearchChange?: (search: string) => void;
        /** Standard controlled value alias. */
        value?: string;
        defaultValue?: string;
        onChange?: ChangeEventHandler<HTMLInputElement>;
        onFocus?: FocusEventHandler<HTMLInputElement>;
        onBlur?: FocusEventHandler<HTMLInputElement>;
        id?: string;
        name?: string;
        disabled?: boolean;
        readOnly?: boolean;
        autoFocus?: boolean;
        /** Defaults to "Search" */
        placeholder?: string;
        /** Defaults to the accessible name resolved from `aria-label` or the placeholder. */
        clearButtonAriaLabel?: string;
        /** Preserved legacy behavior: Escape or blur can restore this value. */
        restorableSearch?: string;
        /** Preserved legacy keyboard callback. */
        onKeyPress?: (key: SearchBarKey) => void;
        inputRef?: Ref<HTMLInputElement>;
    };
