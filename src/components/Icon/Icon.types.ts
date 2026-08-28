import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ElementType } from "react";
import type { OnyxiaIconSizeTokenName } from "../../theme";

export type OnyxiaIconComponent = ElementType<SvgIconProps>;

export type IconProps = Omit<SvgIconProps, "component" | "fontSize"> & {
    icon: OnyxiaIconComponent;
    size?: OnyxiaIconSizeTokenName | "inherit";
    decorative?: boolean;
};
