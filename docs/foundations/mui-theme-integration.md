# MUI Theme Integration

## Scope

This document defines how the Onyxia semantic theme integrates with MUI in
`onyxia-ui-next`.

It describes stable architectural rules. It does not list the current tokens,
their values, or implementation-specific file details.

## Role of the MUI Layer

MUI is a compatibility layer, not the source of truth for the design system.

The authoritative chain is:

```text
Figma
    ↓
JSON token sources
    ↓
Generated token registry
    ↓
Onyxia semantic theme
    ↓
MUI compatibility mapping
    ↓
Components and stories
```

The complete Onyxia semantic theme must remain available independently of MUI.
MUI receives only the subset required for compatibility with MUI primitives and
for progressive migration work.

## Responsibilities

### Onyxia semantic theme

The Onyxia semantic theme is responsible for:

-   resolving primitive palette values for the active brand mode;
-   resolving semantic aliases for the active light or dark mode;
-   exposing typed semantic tokens to Onyxia components;
-   keeping primitive and semantic collection boundaries explicit.

### MUI compatibility layer

The MUI layer is responsible for:

-   mapping a focused subset of semantic tokens to MUI `palette` fields;
-   applying semantic component-state overrides where the native MUI palette is
    insufficient;
-   keeping MUI-specific behavior isolated from the token source and from Onyxia
    components.

It must not:

-   generate tokens;
-   flatten the Onyxia taxonomy into MUI concepts;
-   derive raw colors when an approved semantic token already exists;
-   become the only way to access semantic values.

## State resolution

Interactive states must consume their corresponding semantic use cases.

When dedicated semantic state tokens exist, the MUI layer must use them for:

-   default state;
-   hover state;
-   pressed or active state;
-   focus indication;
-   disabled state.

When no dedicated semantic state token exists yet, the MUI layer must preserve
the base semantic token rather than inventing a derived raw color.

## Palette mapping

The MUI `palette` object should receive only broadly compatible semantic roles,
such as:

-   primary and secondary actions;
-   status colors;
-   text colors;
-   divider color;
-   application background and paper background;
-   generic MUI action fields when a semantic equivalent exists.

This mapping is intentionally partial. Tokens that do not correspond cleanly to
MUI fields must remain available only through the `theme.onyxia` namespace.

## Component overrides

Native MUI palette fields are not sufficient for every Onyxia interaction
state. Component overrides should be used when needed to preserve the approved
semantic behavior.

Typical cases include:

-   contained button hover, pressed, focus, and disabled states;
-   text-field borders, focus rings, and disabled surfaces;
-   alert surfaces and borders;
-   any other MUI primitive whose default internal color logic conflicts with the
    semantic system.

Component overrides must read from the final semantic theme rather than from
duplicated local color logic.

## Consumption rules

Components should follow these rules:

-   Onyxia components consume `theme.onyxia` for the full semantic API.
-   MUI primitives may rely on the mapped `palette` fields and MUI overrides.
-   Components must not import JSON token sources directly.
-   Components must not resolve primitive palette values unless they are part of
    foundation work.

## Maintenance

This document should change when the integration architecture changes, for
example:

-   if responsibilities move between the semantic theme and the MUI layer;
-   if a new class of MUI overrides becomes part of the standard approach;
-   if a different integration contract is approved.

It should not change merely because token values or token inventories evolve in
Figma.
