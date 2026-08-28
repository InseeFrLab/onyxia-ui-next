# TextField

## Purpose

TextField collects short textual input with a visible label, a semantic field
surface, and optional supporting text.

## Anatomy

-   External label above the field container
-   Input surface with native text entry
-   Optional trailing adornment
-   Supporting text row below the field

The label and helper row are optional. The input surface is mandatory.

## States

TextField currently supports the approved Figma states:

-   default
-   hover
-   focus
-   filled
-   disabled
-   error

Read-only is supported at runtime for form usage, but it does not yet have a
dedicated approved Figma visual state.

## Sizes

The current approved Figma component defines one size.

Its layout relies on the shared foundations for:

-   label and content typography
-   internal padding
-   trailing-icon sizing
-   helper-text icon sizing
-   corner radius

## Label behavior

-   The label remains external rather than floating inside the field.
-   The label stays associated with the input through the input `id`.
-   Required fields use the standard form-label required treatment.

## Helper and error text

-   Helper and error content share one supporting-text slot.
-   Error treatment adds an explicit status icon in addition to color.
-   Non-error helper text keeps the approved informational icon treatment.

## Icons and adornments

-   A trailing adornment slot is supported.
-   Password and sensitive fields use the trailing slot for visibility toggle.
-   Adornment sizing follows the Icons and Sizing foundations.

## Accessibility

-   Labels remain programmatically associated with inputs.
-   Helper and error text connect through `aria-describedby`.
-   Error state sets `aria-invalid`.
-   Password visibility uses an accessible button label.
-   Placeholder text does not replace the label.

## Foundation dependencies

-   Colors: semantic surface, content, border, and error tokens
-   Typography: label, body, and caption-related text styles
-   Spacing: label/input/helper gaps and field padding
-   Sizing: trailing icon and progress dimensions
-   Radius: field container corners
-   Icons: status and password-visibility icons

## React API summary

-   `label`, `placeholder`, `helperText`, `helperTextError`
-   `value` and `defaultValue`
-   `error`, `disabled`, `required`, `readOnly`
-   `type`, `autoComplete`, `multiline`, `rows`
-   `InputProps_endAdornment`
-   legacy compatibility aliases: `isErrored`, `doRenderAsTextArea`,
    `inputProps_*`
