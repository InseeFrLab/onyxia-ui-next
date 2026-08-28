# Button

## Purpose

Button is the primary action component for explicit user-triggered commands,
navigation, and secondary supporting actions.

## Styles

-   Primary for the main action.
-   Secondary for strong alternative actions.
-   Tertiary for lower-emphasis filled actions.
-   Text for lightweight actions without a filled surface at rest.

## Sizes

-   Small
-   Medium
-   Large

Each size defines its own semantic typography, horizontal and vertical padding,
icon size, and content gap.

## States

Button supports:

-   default
-   hover
-   pressed
-   focus-visible
-   disabled

Hover and pressed remain interaction states, not public variant props.

## Icons

-   Left and right icons are supported.
-   Button remains a text-bearing action, not an icon-only control.
-   Icons inherit the button content color and consume semantic icon-size
    tokens.

## Accessibility

-   Buttons with visible text use that text as the accessible name.
-   Link behavior is supported through `href`.
-   Focus-visible must remain clearly perceivable in every brand and color
    mode.
-   Decorative icons should not introduce duplicate accessible labels.

## Foundation dependencies

-   Colors: semantic action, content, focus, hover, pressed, and shadow colors
-   Typography: label styles by size
-   Spacing: padding and icon/text gaps
-   Sizing: icon dimensions through icon semantic sizes
-   Radius: pill geometry through `radius-full`
-   Icons: shared `Icon` component and semantic icon sizes

## React API summary

-   `variant`: `primary | secondary | tertiary | text` with legacy
    `ternary` compatibility
-   `size`: `small | medium | large`
-   `startIcon` / `endIcon`
-   `disabled`
-   `href`
-   `type="submit"` for form submission
