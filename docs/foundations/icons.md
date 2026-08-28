# Icons Foundation

## Scope

Icons are a core communication foundation of `onyxia-ui-next`.

They help users identify actions, understand states, recognize objects, and
scan interfaces more efficiently. Unlike scalar foundations such as spacing or
radius, icons are primarily reusable visual assets and component contracts.

Figma remains the Design System source of truth for approved icon concepts,
naming, sizing conventions, and custom-icon needs. `onyxia-ui` remains the
implementation reference for how icons integrate with components and with the
theme.

## Why the icon system exists

Icons support meaning, not decoration alone.

They are useful for:

-   common actions such as search, close, edit, or download;
-   status communication such as success, warning, or error;
-   navigation and structural orientation;
-   compact controls where visual recognition improves scanning speed;
-   reinforcing text labels when the icon meaning is widely understood.

An icon system keeps these signals recognizable and consistent across the
product.

## Primary icon source

Material UI Icons are the default source for common interface icons.

This covers most recurring interface needs such as:

-   navigation arrows and chevrons;
-   search, close, menu, and settings actions;
-   visibility controls;
-   account and global navigation symbols;
-   add, edit, delete, download, and upload actions;
-   informational and status indicators.

The goal is not to make the interface visually different by replacing common
icons with custom artwork. Consistent meaning is more important than decorative
originality.

## When to use a Material icon

Use an existing Material icon when it already communicates the intended meaning
clearly and consistently.

This is the default choice for standard interface concepts because it:

-   reduces maintenance;
-   keeps implementation predictable;
-   aligns well with MUI component APIs;
-   avoids duplicating assets that already exist.

The same concept should reuse the same icon throughout the interface whenever
possible.

## When a custom icon is justified

Custom icons should be reserved for cases where:

-   no suitable Material icon exists;
-   the concept is specific to Onyxia;
-   the icon is part of branding or product identity;
-   the approved Design System explicitly defines a unique asset.

When no suitable Material icon and no approved custom icon exist, the gap
should be reported to the Design System rather than solved by inventing a local
SVG ad hoc.

## Icon sizing

Icon size is part of the shared Design System.

It should not be invented independently in each component. Icon size should
reflect:

-   the density of the component;
-   the surrounding typography;
-   the importance of the action or object;
-   the approved size scale defined in the Design System.

Semantic icon-size tokens may still exist as a dedicated icon vocabulary, but
they should resolve through the shared Sizing foundation rather than acting as
a second primitive dimensional scale.

Icon size is distinct from touch target size. A relatively small icon may sit
inside a much larger interactive area.

## Icon color

Icons use the existing Color foundation.

They should consume semantic content colors rather than a separate icon-only
palette. Depending on context, icons may inherit the color of surrounding text
or use another approved semantic content role such as secondary, disabled,
success, warning, or danger.

Hard-coded raw colors should be avoided.

## Icon and text

Icons often work best when paired with text.

In an icon-plus-text control, the text usually carries the accessible name,
while the icon reinforces recognition and scanning.

Spacing and alignment between icon and text should remain consistent with the
Spacing and Typography foundations.

## Icon-only controls

Icon-only controls require explicit accessible names.

The visual symbol alone is not sufficient for assistive technologies. Controls
such as close buttons, menu toggles, or visibility switches should therefore
provide a clear accessible label on the interactive element itself.

## Decorative icons

Not every icon should be announced.

When an icon is purely supportive and the surrounding text already communicates
the meaning, it should generally remain decorative for assistive technologies
to avoid unnecessary repetition.

Accessibility depends on context rather than on one universal icon rule.

## Future custom SVG support

The icon architecture must remain open to future approved custom SVG icons.

When custom icons are added, they should:

-   use SVG as the source format;
-   preserve a meaningful `viewBox`;
-   avoid fixed presentation colors when semantic color inheritance is needed;
-   prefer `currentColor` when the icon should follow surrounding content
    color;
-   integrate through the same shared icon contract as Material icons.

Custom icons should live in one clear shared location rather than being
scattered across unrelated component directories.

## Figma naming and mapping

Figma should describe icon meaning clearly enough that implementation can stay
semantic.

Approved icon components and instances should therefore favor:

-   meaningful names such as `Search`, `Settings`, or `Close`;
-   stable naming for recurring concepts;
-   explicit custom-icon names when the concept is specific to Onyxia;
-   approved shared icon components rather than detached copied vectors.

This supports reliable Figma-to-code mapping:

-   when a suitable Material icon exists, implementation should reuse it;
-   when a concept requires an approved Onyxia-specific asset, implementation
    should use the shared custom icon;
-   when neither exists, the gap should be reported instead of solved with an
    invented local SVG.

## Responsive considerations

Icons do not need a separate viewport-driven scale by default.

In most cases, icon size should remain tied to component size and hierarchy
rather than changing directly with screen width. If future responsive behavior
is needed, it should still select from the approved shared icon sizes instead
of inventing a new responsive icon scale.

## Relationship with MUI

MUI has two complementary roles:

-   `@mui/icons-material` is the primary external icon source;
-   MUI icon-related component APIs provide the integration contract.

This makes Material icons and future custom SVG icons compatible with the same
component composition patterns, such as icon-only controls, buttons with start
or end icons, and icon adornments.

## Maintenance

Future icon work should:

-   keep Material icons as the default source for common interface symbols;
-   add custom icons only when the Design System explicitly justifies them;
-   keep one shared icon component contract;
-   preserve semantic color usage;
-   preserve approved size usage;
-   avoid icon-name registries unless a real mapping need appears later;
-   report Design System gaps instead of inventing local SVG assets.
