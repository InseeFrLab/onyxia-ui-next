import type { MouseEventHandler, ReactNode } from "react";
import type { OnyxiaIconComponent } from "../Icon";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "ternary"
    | "tertiary"
    | "text";

export type ButtonSize = "small" | "medium" | "large";

type DataAttributes = {
    [attributeName: `data-${string}`]: string | number | boolean | undefined;
};

type AriaAttributes = {
    [attributeName: `aria-${string}`]: string | number | boolean | undefined;
};

export type ButtonProps = ButtonProps.Regular | ButtonProps.Submit;

export namespace ButtonProps {
    type Common = DataAttributes &
        AriaAttributes & {
            className?: string;
            /** Defaults to "primary" */
            variant?: ButtonVariant;
            /** Defaults to "medium" */
            size?: ButtonSize;
            children: ReactNode;
            /** Defaults to false */
            disabled?: boolean;
            startIcon?: OnyxiaIconComponent;
            endIcon?: OnyxiaIconComponent;
            /** Defaults to false */
            autoFocus?: boolean;
            tabIndex?: number;
            name?: string;
            htmlId?: string;
        };

    export type Regular = Common & {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        href?: string;
        /** Defaults to true for external absolute URLs */
        doOpenNewTabIfHref?: boolean;
        target?: string;
        rel?: string;
        type?: "button" | "reset";
    };

    export type Submit = Common & {
        type: "submit";
    };
}
