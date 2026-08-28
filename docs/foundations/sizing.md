# Sizing Foundation

## Scope

Sizing is the foundation that defines the approved reusable dimensions for
repeated visual elements in `onyxia-ui-next`.

It exists to keep common UI dimensions consistent across icons, avatars,
thumbnails, placeholders, compact indicators, and fixed-size controls.

Figma remains the source of truth for approved sizing values, names, and scale
structure. `onyxia-ui` remains the implementation reference for component
philosophy, theme composition, and practical usage patterns.

## Why the sizing system exists

Repeated visual elements become harder to maintain when every component chooses
its own local width and height values.

A shared sizing scale helps:

-   keep repeated dimensions visually coherent;
-   reduce arbitrary one-off dimensions;
-   align component sizing decisions across brands and future foundations;
-   make Figma-to-code translation more reliable;
-   separate durable Design System values from local implementation choices.

Sizing is not a layout system. It defines element dimensions, not the space
between elements.

## Sizing and spacing are different concerns

Sizing and Spacing must remain separate.

Sizing is used for element dimensions such as:

-   icon size;
-   avatar size;
-   thumbnail or placeholder size;
-   repeated fixed square controls;
-   compact indicators and visual containers.

Spacing is used for:

-   padding;
-   margin;
-   gap;
-   layout rhythm;
-   separation between groups.

A repeated UI dimension should use the Sizing foundation when it represents the
size of the element itself. It should use the Spacing foundation when it
represents distance around or between elements.

## Controlled scale

The sizing foundation provides a controlled approved scale rather than an open
set of arbitrary dimensions.

This keeps repeated visual elements aligned across the Design System while
preserving the possibility of contextual or fluid dimensions where the design
actually requires them.

Not every width or height in a product should be forced onto the sizing scale.
Layout widths, responsive media, and content-driven dimensions may remain
contextual.

## Common use cases

Sizing tokens are especially appropriate for:

-   icons;
-   avatars;
-   thumbnails;
-   image placeholders;
-   status indicators;
-   compact illustrations;
-   repeated square controls;
-   small reusable visual containers.

These are the cases where a shared size language improves consistency the most.

## Icon sizing

Icons are one of the primary consumers of the sizing foundation.

The Design System should not maintain an unrelated local icon scale when the
approved sizing scale already defines the underlying dimensions. Icon semantics
may still remain separate from generic sizing semantics, but the values should
come from the shared sizing foundation whenever appropriate.

This distinction matters:

-   the sizing foundation defines reusable dimensions;
-   the icons foundation defines which icon semantic size uses which approved
    shared dimension.
-   the numeric source of truth remains inside Sizing.

## Images, avatars, and visual elements

Avatars, thumbnails, image placeholders, and other repeated visual elements can
reuse approved sizing tokens when they represent stable Design System patterns.

This does not mean every image in the product should become fixed-size.

Fluid content imagery, banners, and layout-driven media may still need
responsive or contextual dimensions. The sizing foundation is primarily for
repeated reusable elements whose dimensions benefit from consistency.

## Component dimensions

The sizing foundation provides shared values, not component specifications.

For example:

-   the foundation defines approved reusable sizes;
-   a component specification decides which size token applies to a button,
    icon-only control, avatar variant, or badge variant.

This keeps the foundation reusable while preventing generic token files from
turning into per-component behavior rules.

## Responsive relationship

The sizing scale remains stable across viewport sizes unless Figma explicitly
defines responsive sizing modes in the future.

Responsive behavior may still choose different approved sizing tokens at
different breakpoints. What should not happen is the creation of a second
independent responsive sizing scale.

The same approved size tokens remain the foundation. Breakpoints only influence
which approved token a context selects.

## Relationship with MUI

MUI is an integration layer, not the source of truth for sizing.

When MUI primitives use repeated visual dimensions, they should consume the
approved Onyxia sizing values through the theme rather than define their own
parallel scale.

The complete sizing foundation belongs to the Onyxia theme. MUI receives only
the compatibility behavior needed for framework primitives and progressive
component migration.

## Maintenance rules

Future sizing work should:

-   use approved sizing tokens when a repeated element dimension already fits
    the shared scale;
-   keep Sizing and Spacing clearly separated;
-   avoid introducing local parallel sizing scales;
-   treat component-specific mappings as specification work rather than as
    generic foundation rules;
-   add new shared sizes only when a recurring Design System need has been
    reviewed and approved;
-   preserve Figma as the source of truth for values and naming.
