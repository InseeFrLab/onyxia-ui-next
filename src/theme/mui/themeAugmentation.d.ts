import type { OnyxiaColorSystem } from "../colorSystem";

declare module "@mui/material/styles" {
    interface Theme {
        onyxia: OnyxiaColorSystem;
    }

    interface ThemeOptions {
        onyxia?: OnyxiaColorSystem;
    }
}
