import React from "react";
import { useTheme } from "@mui/material/styles";
import type { IconProps } from "./Icon.types";

export const Icon = React.memo(
    React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
        const theme = useTheme();
        const ariaLabel = props["aria-label"];
        const ariaHidden = props["aria-hidden"];
        const { icon: IconComponent, size, decorative, sx, ...rest } = props;
        const resolvedSize =
            size ?? theme.onyxia.icon.collection.defaultSizeTokenName;
        const normalizedSx =
            sx === undefined ? [] : Array.isArray(sx) ? sx : [sx];
        const shouldHideFromAssistiveTech =
            decorative ??
            (ariaHidden !== undefined
                ? ariaHidden
                : props.titleAccess === undefined && ariaLabel === undefined);

        return (
            <IconComponent
                ref={ref}
                {...rest}
                aria-hidden={shouldHideFromAssistiveTech || undefined}
                focusable={
                    shouldHideFromAssistiveTech
                        ? false
                        : rest.focusable ?? undefined
                }
                sx={[
                    {
                        color: "inherit",
                        width: "1em",
                        height: "1em",
                        flexShrink: 0,
                        verticalAlign: "middle",
                        fontSize:
                            resolvedSize === "inherit"
                                ? "inherit"
                                : theme.onyxia.icon.toCssSize(resolvedSize),
                    },
                    ...normalizedSx,
                ]}
            />
        );
    }),
);

Icon.displayName = "Icon";
