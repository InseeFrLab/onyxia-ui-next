# Color Foundations

## Scope

This document describes the color foundations of `onyxia-ui-next`.

It translates the design rules defined in Figma into a durable reference for
design and implementation. Its purpose is not to reproduce the current state of
a specific Figma frame or to maintain an exhaustive inventory of every variable.

The Figma Design System remains the reference for the available tokens, their
values, aliases, and modes. This document explains how the system is structured,
how its different layers should be used, and which rules must be preserved in
code.

## Architecture

The color system is organized into two complementary layers:

1. **Color palettes** provide the primitive color values.
2. **Color use cases** assign semantic roles to those primitive values.

This distinction allows the visual identity of an Onyxia instance to evolve, particularly for multiple instances or clients with different branding, without altering the semantic meaning of the colors throughout the interface and, therefore, their functionality.

```text
Color palettes
    ↓
Color use cases
    ├── backgrounds
    ├── surfaces
    ├── contents
    ├── borders
    ├── overlays
    └── shadows
    ↓
Components and interface patterns
```

Components should rely primarily on semantic use-case tokens rather than
directly consuming palette values.

---

## Color Palettes

The Onyxia color palettes are defined according to several complementary
criteria. Together, they create visual consistency across the interface,
regardless of the client instance, while supporting an accessible and coherent
user experience.

The palettes include three main categories:

-   accent colors;
-   neutral colors;
-   functional colors.

Each color is represented by a design token whose name is shared between design
and code.

A palette contains a range of tonal steps, from the lightest to the darkest
shade. This range makes it possible to create hierarchy, contrast, interactive
states, subtle backgrounds, borders, and accessible content combinations
without introducing arbitrary color values.

When a new brand or client color needs to be expanded into a complete palette,
a palette-generation tool may be used as a starting point. The resulting shades
must still be reviewed in context, particularly for:

-   visual consistency;
-   contrast;
-   light and dark themes;
-   interactive states;
-   functional meaning;
-   compatibility with the rest of the system.

Generated palettes must not be accepted solely because they are mathematically
regular. Their use in the interface remains the final validation criterion.

### Palette Categories

#### Accent colors

Accent colors express the visual identity of an Onyxia instance.

They are divided into:

-   `primary`: the main brand and action color;
-   `secondary`: a complementary accent color.

The primary palette may vary between client or brand modes, while the token
names and their intended roles remain stable.

#### Neutral colors

Neutral colors structure most of the interface.

They are used for:

-   page backgrounds;
-   surfaces;
-   text and icons;
-   borders and dividers;
-   disabled states;
-   overlays;
-   shadows and elevation effects.

Neutral colors should provide enough tonal range to support both light and dark
themes.

#### Functional colors

Functional colors communicate a specific status or meaning independently of the
brand palette.

The main functional families are:

-   `success`;
-   `danger`;
-   `warning`;
-   `info`.

Their meaning must remain stable across client instances. A brand color should
not replace a functional color when this would make the status harder to
understand.

### Tonal Scale

Palette tokens use tonal steps such as:

```text
50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
```

Lower values generally represent lighter shades, while higher values represent
darker shades.

The tonal number does not define a use case by itself. A component should not
select a shade only because it appears visually appropriate. The corresponding
semantic token should be used whenever one exists.

### Alpha Colors

Some palettes include authored alpha tokens for overlays, selected states,
shadows, or subtle emphasis.

These alpha values are first-class design tokens. They should be preserved as
defined rather than reconstructed independently in each component.

### Brand Modes

The palette collection can provide several brand modes, for example:

-   `onyxia`;
-   `sspcloud`;
-   `lagoon`;
-   `france`;
-   `amethyst`.

A mode changes the primitive palette values without changing the names or
semantic roles used by components.

This enables the same interface and component implementation to support
different Onyxia identities.

### Palette Naming

Primitive color tokens follow this general hierarchy:

```text
colors-palette/<family>/<subfamily>/<token>
```

Examples:

```text
colors-palette/accent/primary/primary-500
colors-palette/accent/secondary/secondary-300
colors-palette/neutral/neutral-950
colors-palette/alert/warning/warning-alpha-20
```

The slash-separated hierarchy must be preserved in source data, even if another
representation is generated for CSS or TypeScript.

---

## Color Use Cases

Color use cases define how palette colors are applied within the interface.

While palettes describe what colors are available, use-case tokens describe
what those colors mean and where they should be used.

A use-case token is semantic: its name refers to a role such as content,
background, border, surface, action, or status rather than to a specific shade.

For example, a component should use a token representing primary content instead
of directly using a neutral palette value. The semantic token can then point to
a different primitive shade depending on the active light or dark theme.

This layer makes it possible to:

-   keep component usage consistent;
-   change visual values without rewriting components;
-   support light and dark themes;
-   preserve accessible contrast relationships;
-   distinguish visual similarity from semantic meaning;
-   prevent arbitrary use of palette values.

### Semantic Categories

#### Backgrounds

Background tokens define the base environment in which the interface is
displayed.

They are intended for page-level or application-level backgrounds rather than
individual elevated components.

#### Surfaces

Surface tokens define the backgrounds of interface elements placed above the
main background.

They may represent:

-   primary and secondary surfaces;
-   interactive surfaces;
-   selected states;
-   hover and pressed states;
-   status-related surfaces;
-   disabled states.

A surface token should describe the role and state of the element rather than
its visual color.

#### Contents

Content tokens define the colors of information displayed on backgrounds and
surfaces.

They may be used for:

-   text;
-   icons;
-   labels;
-   supporting information;
-   disabled content;
-   inverse content;
-   functional statuses.

Content tokens should always be evaluated together with the surface or
background on which they appear.

#### Borders

Border tokens define separation, grouping, focus, validation, and component
boundaries.

They may represent:

-   neutral borders;
-   subtle or strong separation;
-   focus indication;
-   selected states;
-   validation and functional statuses.

Borders that communicate meaning should not rely on color alone. Components
must also provide an appropriate label, icon, message, or state where required.

#### Overlays

Overlay tokens define translucent layers placed above interface content, for
example behind dialogs or temporary panels.

Overlay colors should preserve sufficient separation from the underlying
interface in both light and dark themes.

#### Shadows

Shadow tokens define the semantic colors used by elevation and depth effects and reference authored neutral alpha tokens from the primitive palette.

Example hierarchy:

```text
usecases/shadow/shadow-color-1
usecases/shadow/shadow-color-2
usecases/shadow/shadow-color-3
...
```

### Light and Dark Modes

Use-case tokens provide semantic values for the supported UI modes:

-   `light`;
-   `dark`.

The token name remains the same in both modes, while its primitive alias may
change.

Example:

```text
usecases/contents/content-primary
    light → colors-palette/neutral/neutral-950
    dark  → colors-palette/neutral/neutral-100
```

Components must not contain separate hard-coded light and dark color choices.
They should consume the same semantic token and let the active mode resolve its
value.

### Use-Case Naming

Semantic color tokens follow this general hierarchy:

```text
usecases/<domain>/<role-or-state>
```

Examples:

```text
usecases/backgrounds/background
usecases/contents/content-primary
usecases/borders/border-neutral-primary
usecases/borders/border-focus
usecases/surface/surface-primary
usecases/surface/surface-action-primary-hover
usecases/overlay/default
usecases/shadow/shadow-color-1
```

Names should describe intent rather than appearance.

A semantic token may share the same resolved value as another token while still
representing a different role. Such tokens must remain distinct because their
values may evolve independently.

---

## Alias Relationships

Use-case tokens reference primitive palette tokens through aliases.

```text
Semantic token
    → Primitive palette token
        → Resolved color value for the active brand mode
```

Representative examples:

| Semantic token                        | Light mode alias                                 | Dark mode alias                                  |
| ------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| `usecases/backgrounds/background`     | `colors-palette/neutral/neutral-100`             | `colors-palette/neutral/neutral-950`             |
| `usecases/contents/content-primary`   | `colors-palette/neutral/neutral-950`             | `colors-palette/neutral/neutral-100`             |
| `usecases/contents/content-secondary` | `colors-palette/neutral/neutral-800`             | `colors-palette/neutral/neutral-300`             |
| `usecases/borders/border-focus`       | `colors-palette/accent/primary/primary-500`      | `colors-palette/accent/primary/primary-400`      |
| `usecases/surface/surface-primary`    | `colors-palette/neutral/neutral-50`              | `colors-palette/neutral/neutral-900`             |
| `usecases/surface/surface-selected`   | `colors-palette/accent/primary/primary-alpha-20` | `colors-palette/accent/primary/primary-alpha-20` |
| `usecases/shadow/shadow-color-1`      | `colors-palette/neutral/neutral-alpha-5`         | `colors-palette/neutral/neutral-alpha-5`         |
| `usecases/shadow/shadow-color-4`      | `colors-palette/neutral/neutral-alpha-20`        | `colors-palette/neutral/neutral-alpha-20`        |

Aliases are part of the design-system architecture and must be preserved in
implementation. Semantic tokens must not be reduced to duplicated raw color
values in the source of truth.

---

## Usage Rules

### Prefer semantic tokens

Components and product interfaces should use `colors-usecases` tokens whenever
an appropriate semantic role exists.

```text
Preferred:
usecases/contents/content-primary

Avoid:
colors-palette/neutral/neutral-950

Never:
#22262f
```

### Use primitive tokens intentionally

Primitive palette tokens may be used:

-   when defining semantic aliases;
-   when creating or extending a foundation;
-   when no semantic role exists and a new use case is being formally evaluated.

They should not be selected directly inside components as a shortcut.

### Do not create local color values

Components must not introduce:

-   arbitrary hexadecimal values;
-   locally calculated opacity variants;
-   unregistered palette shades;
-   duplicated theme-specific values.

A recurring need should lead to a review of the semantic system rather than a
component-level workaround.

### Preserve semantic distinctions

Two semantic tokens may currently resolve to the same color. They must not be
merged only because their present values match.

Their names describe different responsibilities and allow the system to evolve
without coupling unrelated use cases.

### Preserve both mode axes

Implementation must support two independent concerns:

-   the active brand or client palette;
-   the active light or dark UI mode.

Brand selection determines primitive values. Theme selection determines which
primitive aliases are used by semantic tokens.

### Accessibility

Color choices must support accessible contrast and understandable states.

In particular:

-   text and essential icons must meet the contrast requirements defined by the
    accessibility guidelines of the project;
-   focus indicators must remain clearly visible;
-   status and validation must not rely on color alone;
-   disabled content must remain understandable without appearing interactive;
-   light and dark modes must be tested independently;
-   brand modes must not weaken semantic contrast relationships.

Accessibility validation belongs to both the token definition and the component
implementation.

---

## Implementation Principles

### Source and generated representations

The implementation must preserve:

-   collection boundaries;
-   token hierarchy;
-   brand modes;
-   light and dark modes;
-   alias relationships;
-   alpha values;
-   semantic token names.

Generated CSS or TypeScript names may transform Figma paths into a
language-safe format, but the original Figma token path must remain traceable.

### CSS variables

CSS custom properties are suitable for exposing primitive and semantic colors.

Semantic variables should reference primitive variables rather than repeating
their resolved values.

Conceptual example:

```css
--color-palette-primary-500: #fe3711;
--color-content-primary: var(--color-palette-neutral-950);
--color-shadow-1: var(--color-palette-neutral-alpha-5);
```

Brand and theme modes should be applied through separate scopes or selectors.

### TypeScript

TypeScript may expose:

-   token maps;
-   typed token paths;
-   mode definitions;
-   helpers for generated CSS variables;
-   mappings to framework-specific themes.

Generated representations must not become a second manually maintained source
of truth.

### MUI Mapping

The complete Onyxia color taxonomy should not be flattened into MUI's native
`palette` object.

A dedicated mapping layer should expose the approved Onyxia semantic tokens
through a simple, stable, and typed theme API for components, while mapping only
the relevant subset to standard MUI fields.

```text
Figma color tokens
    ↓
Generated Onyxia token registry
    ↓
Onyxia semantic theme API
    ├── complete token access for Onyxia components
    └── focused mapping to MUI palette fields
```

The mapping should:

-   reuse relevant patterns already present in `onyxia-ui`;
-   centralize mode resolution and derived values;
-   preserve the distinction between brand and light/dark modes;
-   avoid raw values and repeated calculations inside components;
-   expose semantic shadow colors alongside other use-case colors;
-   keep aliases traceable to their source tokens;
-   use MUI theme augmentation when native MUI fields are insufficient.

A dedicated documentation and implementation layer should define:

-   which tokens map to native MUI fields;
-   which tokens remain available only through the Onyxia theme namespace;
-   how brand and theme modes are resolved;
-   how components consume the final typed API;
-   how existing `onyxia-ui` behavior is reused or adapted.

---

## Maintenance

This document describes stable principles rather than the exact number of
variables currently present in Figma.

Adding, removing, or adjusting a token does not necessarily require changing
this document. It should be updated when the architecture, naming conventions,
usage rules, mode strategy, or implementation principles change.

The current list of tokens and their values should be obtained from the Figma
Design System or from the generated token source once the export pipeline is in
place.
