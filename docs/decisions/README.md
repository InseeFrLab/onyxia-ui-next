# Repository Architecture Principles

This directory contains durable architectural references for `onyxia-ui-next`.

These principles apply to every foundation and component contribution unless a
maintainer-approved decision record explicitly supersedes them.

## Design and implementation sources

-   Figma is the Design System source of truth for approved tokens, hierarchy,
    naming, and values.
-   `onyxia-ui` is the implementation reference for architecture, conventions,
    semantic logic, and proven integration patterns.
-   `onyxia-ui-next` is an evolution of `onyxia-ui`, not a rewrite.
-   Existing `onyxia-ui` architecture should be reused whenever it remains
    relevant.
-   Divergence from `onyxia-ui` is acceptable only when it is justified by the
    approved Design System, maintainability, or a clear technical constraint.

## Repository responsibilities

-   Every folder must have one clear responsibility.
-   Foundation documentation belongs under `docs/foundations/`.
-   Architecture references and lasting technical rules belong under
    `docs/decisions/`.
-   Temporary migration material belongs under `docs/migration/`.
-   Editable token sources belong under `src/tokens/source/`.
-   Generated token artifacts belong under `src/tokens/generated/`.
-   Theme construction belongs under `src/theme/`.
-   MUI integration belongs under `src/theme/mui/`.
-   Components belong under `src/components/`.
-   Storybook stories belong under `stories/`.

## Token architecture

-   Editable token sources are JSON files.
-   Generated files must never be edited manually.
-   Foundations should follow the same architecture:

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

-   Token generation must remain deterministic and checkable in CI or local
    validation.
-   Foundation-specific implementation details must not leak into the editable
    token sources.
-   Exploratory design tooling may live alongside the repository, but it must
    remain separate from official token sources and must not write approved
    Design System values automatically.

## Theme and component rules

-   The Onyxia Theme is the Design System public API.
-   MUI is an integration layer, never the source of truth.
-   Components consume semantic theme tokens only.
-   Components must not read token JSON directly.
-   Components must not resolve primitive values directly unless they are part
    of foundation work.
-   Responsive or mode resolution belongs inside the foundation and theme
    layers, never inside individual components.
-   Spacing uses a controlled shared scale based on a 4px unit.
-   Components and layouts must use approved spacing tokens instead of
    arbitrary values.
-   The 4px base unit does not mean that every multiple of 4px belongs to the
    approved shared scale.
-   Responsive layouts may select different approved spacing tokens at
    different breakpoints, but responsive behavior must not create a second
    spacing scale.
-   New shared spacing values require Design System review before they become
    foundation tokens.
-   Border Radius uses a controlled shared scale of approved tokens.
-   Components and stories must use approved radius tokens instead of
    arbitrary values when corner treatment belongs to the shared system.
-   `radius-full` is a semantic fully rounded value, not an ordinary numeric
    step in the radius scale.
-   Responsive or contextual designs may select different approved radius
    tokens, but must not create a separate arbitrary radius scale.
-   New shared radius values require Design System review before they become
    foundation tokens.
-   Material UI Icons are the default source for common interface icons.
-   Custom icons are reserved for Onyxia-specific, branding, or otherwise
    unsupported concepts and must not be invented locally when no approved
    asset exists.
-   Icons should share one component contract so Material icons and future
    custom SVG icons remain interchangeable for component authors.
-   Icons must consume approved semantic colors and approved icon sizes instead
    of copied SVG paths, hard-coded colors, or local ad hoc size values.
-   Sizing defines reusable element dimensions such as icons, avatars,
    thumbnails, placeholders, and repeated fixed visual elements.
-   Sizing and Spacing are separate concerns and must not be used
    interchangeably.
-   Icons and repeated fixed visual elements should consume approved sizing
    tokens where appropriate.
-   Component specifications determine which sizing token applies to a specific
    variant or state.
-   Responsive behavior may select different approved sizing tokens, but must
    not create a parallel sizing scale.
-   New shared sizes require Design System review before they become foundation
    tokens.

## Documentation rules

-   Documentation should explain principles, responsibilities, and usage rules.
-   Documentation should not become a token inventory.
-   Documentation should not describe temporary migration steps or repository
    status snapshots.
-   Lasting architectural changes should be captured here before they are
    repeated in implementation prompts.

## Contribution rules

-   Prefer simplicity over unnecessary abstractions.
-   Prefer consistency with `onyxia-ui` over introducing a different coding
    style.
-   Reuse existing helpers and patterns when they already solve the same
    problem coherently.
-   Introduce new helpers, layers, or dependencies only when they remove clear
    duplication or address a real architectural need.
-   Internal design-tooling utilities are not part of the public library API
    unless a real consumer/runtime use case is approved.
-   Every implementation pass should finish with an architecture cleanup that
    removes obsolete files, dead code, duplicate helpers, and unnecessary
    wrappers.

## Decision records

When a change needs a lasting exception or an architectural decision beyond
these baseline principles, add a dedicated decision record in this directory.

Each decision record should state:

-   the context;
-   the decision;
-   the consequences;
-   whether maintainer approval was required.
