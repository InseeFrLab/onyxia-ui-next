import type { OnyxiaTheme } from "../theme";

declare module "@mui/material/styles" {
    interface Theme {
        onyxia: OnyxiaTheme;
    }

    interface ThemeOptions {
        onyxia?: OnyxiaTheme;
    }
}
