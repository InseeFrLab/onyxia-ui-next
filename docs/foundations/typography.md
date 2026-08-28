# Typography Foundation

## Scope

Typography is one of the core foundations of the Onyxia Design System. It provides a consistent and reusable language for presenting information across every product, interface and branding.

Rather than defining fonts independently in each screen or component, Onyxia relies on a shared set of semantic typography styles. This ensures a clear visual hierarchy, improves readability and accessibility, and creates a consistent experience across the entire ecosystem.

Like every Design System foundation, Typography is designed in Figma and shared with code through common design tokens.

Figma remains the source of truth for approved typography values, naming, and
hierarchy. `onyxia-ui` remains the implementation reference for theme
composition, responsive philosophy, and consumer conventions.

---

## Typefaces and Typography

The Typography foundation intentionally separates two independent concepts: **Typefaces** and **Typography styles**.

### Typefaces

Typefaces define **which font family** is used by a branding.

For example, one product may use **Work Sans** while another uses **Marianne**, without changing the structure or hierarchy of the interface.

Changing a typeface changes the visual identity of a product, but not the way information is organized.

### Typography styles

Typography styles define **how text is used** throughout the interface.

Each style represents a semantic role rather than a specific visual appearance.

Examples include:

-   Display
-   Heading
-   Body
-   Label
-   Caption
-   Code

Each style combines several properties such as:

-   a typeface (through a semantic typeface role);
-   font size;
-   font weight;
-   line height;
-   letter spacing (when required).

Together, these styles provide a shared language between designers and developers while ensuring consistency across products.

---

## Semantic hierarchy

Typography is organized around meaning rather than appearance.

Instead of manually choosing font sizes, components use semantic typography styles that describe the role of the content.

The hierarchy is designed to structure information consistently across the interface:

-   **Display** is reserved for exceptional, high-impact content such as landing pages or hero sections.
-   **Heading** defines the main structure of a page and should be used to build a clear content hierarchy (page titles, section titles, subsections, etc.).
-   **Body** is used for the primary reading experience, including paragraphs, descriptions and longer pieces of content.
-   **Label** introduces or highlights content within a section without creating a new structural heading. It is particularly suited for smaller section titles, interface groups, navigation elements, metadata or short pieces of emphasized text.
-   **Caption** supports secondary information such as annotations, hints or complementary content.
-   **Code** is dedicated to technical content and monospace text.

This semantic approach encourages designers to think about the role of information before its visual appearance, making interfaces more consistent and easier to evolve over time.

---

## Branding

Typography styles remain shared across every branding.

Only the referenced typefaces may change.

This allows each product to express its own visual identity without redefining the entire typography system.

Components therefore always consume the same semantic typography styles, regardless of the active branding.

Typeface delivery remains a foundation concern. The library should ship the font
assets required by the approved typeface roles, while Storybook and consuming
applications explicitly load the shared font CSS entrypoint instead of
redeclaring `@font-face` rules locally.

---

## Responsive typography

The Typography foundation is designed to support multiple responsive scales.

Depending on the active viewport, the same semantic style may resolve to different typography values while preserving its meaning and role within the hierarchy.

For example, a **Heading / XL** remains a **Heading / XL** whether it is displayed on a laptop or on a larger desktop screen.

This allows typography to adapt to different layouts without changing the semantic structure of the interface.

Responsive mode resolution belongs to the Typography foundation and to theme
construction. Components should keep consuming `theme.onyxia.typography`
without resolving breakpoints or typography modes locally.

---

## Design principles

When designing new interfaces:

-   use semantic typography styles instead of manually selecting font sizes;
-   preserve the established hierarchy before introducing new styles;
-   avoid creating local typography variations when an existing style already meets the need;
-   think in terms of content hierarchy rather than visual appearance;
-   maintain consistent typography across every screen and component.

Whenever a new text style seems necessary, it should first be evaluated as a potential addition to the Design System rather than created specifically for a single screen.

---

## Design tokens

Typography is shared between Figma and code through semantic design tokens.

Like every Design System foundation, it follows a common architecture:

```text
Figma
    ↓
JSON token sources
    ↓
Generated token registry
    ↓
Onyxia Theme
    ↓
MUI compatibility layer
    ↓
Components
```

This architecture ensures that designers and developers work from the same definitions while keeping the implementation maintainable over time.

`onyxia-ui` remains the implementation reference for theme composition,
responsive philosophy, and consumer conventions. `onyxia-ui-next` should
therefore evolve those patterns rather than replace them with a different
architecture when the approved Design System does not require it.

The Onyxia Theme is the public Typography API. MUI remains a compatibility
layer for framework primitives and should never become the source of truth for
the full semantic typography hierarchy.

---

## Rules for component authors

Components should:

-   consume semantic typography styles from `theme.onyxia.typography`;
-   avoid defining local font sizes, line heights, or weights when an approved semantic style already exists;
-   rely on the foundation-level responsive resolution instead of implementing breakpoint-specific typography logic locally;
-   treat MUI typography variants as compatibility helpers rather than as the canonical design API.

---

## Rules for future maintainers

Future foundation work should:

-   preserve the separation between typeface roles and typography styles;
-   preserve JSON as the editable source and generated files as derived artifacts;
-   keep responsive mode resolution centralized in theme construction;
-   reuse `onyxia-ui` patterns when they still fit the approved Design System;
-   introduce architectural divergence only when it is justified by Figma or a clear maintainability gain.
