import type { ThemeOptions } from "@mui/material/styles";
import type { OnyxiaTheme } from "../theme";
import { typographyStyleToCssProperties } from "../typographySystem";

export function createOnyxiaMuiTypographyOptions(
    onyxia: OnyxiaTheme,
): ThemeOptions["typography"] {
    const { styles, typefaces } = onyxia.typography;

    return {
        fontFamily: typefaces.primary,
        h1: typographyStyleToCssProperties(styles.heading.xl),
        h2: typographyStyleToCssProperties(styles.heading.lg),
        h3: typographyStyleToCssProperties(styles.heading.md),
        h4: typographyStyleToCssProperties(styles.heading.sm),
        h5: typographyStyleToCssProperties(styles.label.lg),
        h6: typographyStyleToCssProperties(styles.label.md.default),
        subtitle1: typographyStyleToCssProperties(styles.body.lg),
        subtitle2: typographyStyleToCssProperties(styles.body.md),
        body1: typographyStyleToCssProperties(styles.body.md),
        body2: typographyStyleToCssProperties(styles.body.sm),
        button: {
            ...typographyStyleToCssProperties(styles.label.md.default),
            textTransform: "none",
        },
        caption: typographyStyleToCssProperties(styles.caption.md),
        overline: {
            ...typographyStyleToCssProperties(styles.label.sm),
            textTransform: "none",
        },
    } as ThemeOptions["typography"];
}
