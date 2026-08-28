# Spacing Foundation

## Scope

Spacing is one of the core layout foundations of `onyxia-ui-next`.

It defines the approved distances used to organize content, separate groups,
create rhythm, and support readable interfaces. Like the other foundations, it
is designed in Figma and shared with code through common design tokens.

Figma remains the source of truth for approved spacing values and naming.
`onyxia-ui` remains the implementation reference for theme composition,
component usage patterns, and responsive philosophy.

## Why the spacing system exists

Spacing is not decoration. It is part of the interface language.

The distance between elements helps users understand whether pieces of content:

-   belong together;
-   belong to the same group;
-   represent distinct sections;
-   require dense or comfortable reading;
-   support quick scanning or longer reading.

Smaller gaps usually indicate a stronger relationship.
Larger gaps usually indicate a stronger separation.

When spacing is chosen arbitrarily at the component level, this hierarchy
becomes inconsistent and harder to maintain.

## Base unit and controlled scale

The spacing foundation is based on a 4px unit.

This base unit helps keep the scale regular and predictable, but it does not
mean that every multiple of 4px automatically belongs to the shared Design
System.

Only approved spacing tokens belong to the foundation scale.

This distinction matters because a Design System is not a mathematical grid
alone. It is a curated set of values that are repeatedly useful for interface
layout, grouping, and component rhythm.

If every multiple of 4px were treated as automatically valid, the spacing scale
would quickly lose its role as a shared design language.

## Hierarchy and relationships

Spacing helps communicate structure before a user reads a single word.

Typical patterns include:

-   tight spacing for strongly related items such as a label and short
    supporting text;
-   medium spacing for content grouped inside one card, fieldset, or section;
-   large spacing for separation between major blocks, panels, or sections.

The correct spacing choice should reflect the relationship between elements,
not only visual preference.

## Layout rhythm

Spacing supports rhythm across the full interface:

-   within components;
-   between components;
-   inside forms;
-   across cards and panels;
-   across sections and pages.

A controlled scale makes these relationships easier to repeat consistently
across products and branding modes.

## Components and tokens

Components should consume approved spacing tokens instead of inventing local
pixel values whenever the spacing decision belongs to the shared Design System.

This applies to cases such as:

-   internal component padding;
-   vertical stacking between related controls;
-   gaps between icons and labels;
-   spacing between sections or grouped content;
-   repeated layout rhythm inside reusable interface patterns.

Not every numeric value in CSS is spacing.

Dimensions, geometry, borders, and positioning rules should not be forced into
the spacing foundation when they represent another concern.

## Responsive spacing

The approved spacing scale remains shared across viewport sizes.

Responsive behavior should not create a second spacing scale.

Instead, responsive layouts may choose different approved spacing tokens at
different breakpoints when the design system explicitly defines that behavior.

The meaning stays the same:

-   one shared scale;
-   breakpoint-aware token selection;
-   no arbitrary intermediate values.

Responsive resolution belongs to the foundation and theme layers, not to
ad hoc logic inside each component.

## Relationship with design tokens

Spacing is shared between design and code through approved spacing tokens.

Like the other foundations, it follows the common repository architecture:

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

The Onyxia Theme is the public spacing API.

## Relationship with MUI

MUI is a compatibility layer, not the source of truth for spacing.

When MUI primitives use spacing, they should resolve through the approved
Onyxia spacing foundation rather than through an unrelated default multiplier
or arbitrary local values.

The complete spacing system therefore belongs to `theme.onyxia`, while MUI
receives only the compatibility behavior needed for framework primitives.

## Rules for component authors

Components should:

-   choose approved spacing tokens instead of arbitrary pixel values when the
    decision belongs to the shared system;
-   preserve the relationship between elements through consistent token usage;
-   keep responsive spacing decisions centralized rather than resolving them
    independently in each component;
-   treat MUI spacing helpers as a compatibility path, not as the design source
    of truth.

## Rules for future maintainers

Future spacing work should:

-   preserve the controlled scale instead of expanding it casually;
-   add new shared values only after Design System review;
-   keep JSON as the editable source and generated files as derived artifacts;
-   keep responsive behavior centralized in the theme layer;
-   reuse `onyxia-ui` patterns when they still fit the approved spacing system;
-   avoid introducing parallel spacing helpers or duplicate local scales.
