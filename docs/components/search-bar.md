# SearchBar

## Purpose

SearchBar provides a compact search-focused text input for filtering, lookup,
and quick navigation scenarios.

## Anatomy

-   Search surface container
-   Leading search icon
-   Search input
-   Optional clear action while active

The container, search icon, and input are mandatory. The clear action is
state-dependent.

## States

The approved Figma component defines:

-   default
-   hover
-   active
-   active with a value

`onyxia-ui-next` also supports a runtime disabled state for application use,
while preserving the approved search-state semantics.

## Sizes

The current approved Figma component defines one size.

Its layout relies on shared foundations for:

-   control height
-   internal padding
-   gap between icon and content
-   icon sizing
-   corner radius

## Search icon

-   The leading search icon is always visible.
-   It uses the shared Onyxia Icon architecture.
-   It remains decorative when the input already has an accessible name.

## Clear action

-   The clear action appears only in the active states.
-   It is implemented as an accessible button.
-   Clearing preserves the legacy `onyxia-ui` restore-or-reset behavior.

## Keyboard behavior

-   `Enter` preserves the legacy search callback behavior.
-   `Escape` clears or restores the restorable search value.
-   Clearing with the button preserves focus only when a restorable value is in
    play, matching the legacy behavior.

## Accessibility

-   The input uses `type="search"`.
-   The input accessible name resolves from `aria-label` when provided, or from
    the placeholder fallback.
-   The clear action has its own accessible name.

## Relationship with TextField

SearchBar remains a dedicated component rather than a TextField wrapper.

It reuses the same foundations, but not the same component shell, because the
approved search control has:

-   no external label or helper row;
-   active-only clear behavior;
-   search-specific keyboard and restore behavior;
-   a shadowed surface with hover bottom-border treatment.

## Foundation dependencies

-   Colors: semantic surface, content, border-focus, and shadow colors
-   Typography: label-medium and label-medium-bold styles
-   Spacing: internal padding and icon/content gap
-   Sizing: control height and icon sizes
-   Radius: shared rounded container treatment
-   Icons: search and clear icons

## React API summary

-   legacy controlled props: `search`, `onSearchChange`
-   standard aliases: `value`, `defaultValue`, `onChange`
-   `placeholder`, `disabled`, `readOnly`, `autoFocus`
-   `restorableSearch`, `onKeyPress`
-   `inputRef`, `id`, `name`
