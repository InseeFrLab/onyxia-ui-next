# Radius Foundation

## Scope

Radius is a core visual foundation of `onyxia-ui-next`.

It defines how corners are rounded across the interface and helps establish the
overall character of surfaces, controls, and containers. Like the other
foundations, it is designed in Figma and carried into code through shared
tokens.

Figma remains the source of truth for approved radius naming and values.
`onyxia-ui` remains the implementation reference for component philosophy,
theme composition, and practical UI semantics.

## Why the radius system exists

Corner treatment is part of the interface language.

Radius contributes to:

-   perceived softness or precision;
-   the visual character of controls and surfaces;
-   the hierarchy between compact and prominent elements;
-   the consistency of the overall product identity.

When radius is chosen arbitrarily inside components, that visual language
fragments quickly and becomes difficult to maintain.

## Controlled scale

The radius foundation uses a small approved token scale rather than an open set
of local pixel values.

This matters because radius is not only a technical CSS property. It is a
shared design decision that affects how components feel and relate to each
other.

Using approved tokens keeps that decision consistent across products, brands,
and future component work.

## Sharp and rounded character

Radius influences how structured or soft an element appears.

In general:

-   smaller radius feels more compact, structured, or utility-oriented;
-   medium radius supports standard component treatment;
-   larger radius feels softer, more prominent, or more expressive;
-   full radius supports pill, capsule, or circular geometry when the shape
    itself is intended to be fully rounded.

This is design guidance, not an automatic rule. The right choice still depends
on the meaning, size, and context of the component.

## Radius and hierarchy

Radius helps express hierarchy alongside color, spacing, and typography.

Dense structured elements such as inputs, compact controls, and utility
surfaces often benefit from tighter corner treatment.

More prominent containers, cards, interactive surfaces, or emphasis areas may
benefit from a softer treatment when the design system calls for it.

The goal is not to assign one fixed radius to every component category. The
goal is to keep component decisions inside one approved shared visual language.

## Fully rounded shapes

`radius-full` is a semantic special case.

It does not represent the largest ordinary numeric step of the radius scale.
It represents a fully rounded result.

This makes it appropriate for pills, capsules, and circular or near-circular
elements when the geometry supports that intent.

It should not be used merely because a component needs a larger radius than
usual. Components should use `radius-full` only when a fully rounded character
is semantically intended.

## Components and token usage

Components should consume approved radius tokens whenever the corner treatment
belongs to the shared Design System.

This applies to cases such as:

-   component containers;
-   cards and surfaces;
-   inputs and controls;
-   interactive emphasis areas;
-   repeated rounded patterns used across the product.

Not every curved shape is a radius-token decision.

Some geometry-specific cases, such as circles, clipped media, or decorative
shapes, may still require geometry-driven solutions rather than a shared
foundation token.

## Responsive and contextual usage

The approved radius scale remains stable across viewport sizes.

Responsive behavior should not create a second radius scale.

Future responsive or contextual work may select different approved radius
tokens at different breakpoints when the design system explicitly requires it,
but those selections must still come from the same shared token set.

## Relationship with design tokens

Radius follows the same repository architecture as the other foundations:

```text
Figma
    ↓
JSON token sources
    ↓
Generated tokens
    ↓
Onyxia Theme
    ↓
MUI integration
    ↓
Components
```

The Onyxia Theme is the public radius API.

## Relationship with MUI

MUI is a compatibility layer, not the source of truth for radius.

The complete radius foundation belongs to `theme.onyxia`.
MUI should receive only the compatibility behavior needed for framework
primitives, such as a base `shape.borderRadius` value and explicit component
overrides where the default MUI behavior is not sufficient.

## Rules for component authors

Components should:

-   use approved radius tokens instead of arbitrary values when the decision
    belongs to the shared system;
-   preserve the semantic difference between standard rounded treatment and
    fully rounded treatment;
-   avoid introducing local component radius scales;
-   keep responsive radius choices tied to approved tokens rather than to local
    ad hoc values.

## Rules for future maintainers

Future radius work should:

-   preserve the controlled scale instead of expanding it casually;
-   keep `radius-full` semantic rather than treating it as an ordinary numeric
    step;
-   reuse `onyxia-ui` patterns when they remain relevant;
-   keep JSON as the editable source and generated files as derived artifacts;
-   keep MUI as a compatibility layer rather than the primary radius API;
-   add new shared radius values only after Design System review.
