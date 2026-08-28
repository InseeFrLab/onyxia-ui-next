# TextField migration

This document records temporary migration decisions between `onyxia-ui` and
`onyxia-ui-next`.

## Props preserved

-   `id`
-   `name`
-   `label`
-   `placeholder`
-   `defaultValue`
-   `type`
-   `autoComplete`
-   `disabled`
-   `onChange`
-   `onBlur`
-   `onFocus`
-   `rows`
-   `InputProps_endAdornment`
-   `inputProps_ref`
-   `inputProps_aria-label`
-   `inputProps_className`
-   `inputProps_tabIndex`
-   `inputProps_spellCheck`
-   `inputProps_autoFocus`
-   `selectAllTextOnFocus`
-   `onEscapeKeyDown`
-   `onEnterKeyDown`
-   `isCircularProgressShown`

## Props adapted

-   `isErrored` is preserved as a compatibility alias and resolves through the
    standard `error` state.
-   `doRenderAsTextArea` is preserved as a compatibility alias for
    `multiline`.
-   Trailing password visibility stays built-in, but it now follows the new
    semantic icon and color foundations.
-   Helper text now follows the approved Figma informational/error row
    structure.

## New API surface

-   `value` enables controlled usage alongside `defaultValue`.
-   `required` is exposed explicitly.
-   `readOnly` is supported explicitly.
-   `fullWidth` is supported explicitly.
-   `helperTextError` provides a dedicated error-message slot.

## Deprecated candidates

-   `isErrored` can be removed after consumers switch to `error`.
-   `doRenderAsTextArea` can be removed after consumers switch to `multiline`.
-   The `inputProps_*` compatibility aliases can eventually be replaced by a
    cleaner input-props contract once migration constraints are lifted.

## Visual changes

-   The legacy underline-based field treatment is replaced by the approved
    filled-surface Figma model.
-   Label placement, helper row, error iconography, radius, and padding now
    follow `onyxia-ui-next` foundations.

## Behavioral changes

-   The field now supports both controlled and uncontrolled usage.
-   Updating `defaultValue` still refreshes the uncontrolled value for
    migration compatibility.
-   `InputProps_endAdornment` now takes precedence over the legacy built-in
    trailing affordances instead of being ignored.

## Breaking changes

-   Legacy validation orchestration props such as `getIsValidValue`,
    `onValueBeingTypedChange`, `evtAction`, `options`, and `freeSolo` are not
    yet migrated.
-   Legacy tooltip-specific helper props are not yet migrated.
