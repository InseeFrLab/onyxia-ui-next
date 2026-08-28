import type { ThemeOptions } from "@mui/material/styles";
import type { OnyxiaRadiusSystem } from "../radiusSystem";

export function createOnyxiaMuiShapeOptions(
    radius: OnyxiaRadiusSystem,
): ThemeOptions["shape"] {
    return {
        borderRadius: radius.get("radius-2"),
    };
}
