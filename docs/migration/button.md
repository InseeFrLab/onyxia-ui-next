# Button migration

This document records temporary migration decisions between `onyxia-ui` and
`onyxia-ui-next`.

## Props preserved

-   `variant`
-   `children`
-   `disabled`
-   `startIcon`
-   `endIcon`
-   `autoFocus`
-   `tabIndex`
-   `name`
-   `htmlId`
-   `href`
-   `doOpenNewTabIfHref`
-   `type="submit"`

## Props adapted

-   `variant="ternary"` is preserved for compatibility but maps to the new
    Figma Tertiary style.
-   `size` is now explicit and follows the approved Figma sizes:
    `small | medium | large`.

## New API surface

-   `variant="text"` exposes the new Figma text-like style.
-   `variant="tertiary"` is accepted as a forward-looking alias for the legacy
    `ternary` spelling.

## Deprecated candidates

-   `variant="ternary"` is a deprecation candidate once the migration window is
    closed and consumers have moved to `tertiary`.

## Visual changes

-   The old bordered/button-governed visuals are replaced by the approved
    Figma filled, tertiary, and text treatments.
-   Button padding, radius, typography, icon sizing, and interaction states now
    follow `onyxia-ui-next` foundations.

## Breaking changes

-   Consumers that relied on the previous visual appearance should expect a new
    design.
-   Consumers that need the new text-like style must opt into `variant="text"`.
