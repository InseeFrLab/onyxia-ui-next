# SearchBar migration

This document records temporary migration decisions between `onyxia-ui` and
`onyxia-ui-next`.

## Props preserved

-   `search`
-   `onSearchChange`
-   `placeholder`
-   `restorableSearch`
-   `onKeyPress`
-   `className`

## Props adapted

-   The legacy click-to-activate model is preserved, but the control now uses a
    permanent real search input instead of switching between a label and an
    input subtree.
-   Clear behavior still follows the restore-or-reset legacy logic, but it is
    now implemented with the new icon and theme foundations.
-   The forwarded ref now targets the input element instead of the legacy root
    wrapper.

## New API surface

-   `value`, `defaultValue`, and `onChange`
-   `disabled`
-   `readOnly`
-   `autoFocus`
-   `id`
-   `name`
-   `inputRef`
-   `clearButtonAriaLabel`

## Deprecated candidates

-   `search` and `onSearchChange` are deprecation candidates once consumers have
    fully moved to the standard input props.

## Visual changes

-   The previous legacy search bar visuals are replaced by the approved Figma
    rounded surface, shadow, hover underline, and active search emphasis.
-   Typography, spacing, icon sizing, and radius now resolve through the
    Onyxia foundations.

## Behavioral changes

-   The component supports both legacy controlled usage and standard controlled
    or uncontrolled input usage.
-   The clear action now has an explicit accessible label.
-   Native browser search clear controls are suppressed in favor of the
    approved shared clear action.

## Breaking changes

-   Legacy `evtAction` and `classes` props are not migrated in this first pass.
