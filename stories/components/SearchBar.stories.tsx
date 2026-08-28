import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { SearchBar } from "../../src";
import type { SearchBarProps } from "../../src/components/SearchBar";

type PlaygroundArgs = {
    autoFocus: boolean;
    defaultValue: string;
    disabled: boolean;
    placeholder: string;
    readOnly: boolean;
    restorableSearch: string;
};

function StoryPage(props: {
    title: string;
    summary: string;
    children: React.ReactNode;
}) {
    const { title, summary, children } = props;
    const theme = useTheme();
    const spacing = theme.onyxia.spacing;

    return (
        <Box
            component="article"
            sx={{
                minHeight: "100vh",
                px: {
                    xs: spacing.toCssValue("spacing-2"),
                    md: spacing.toCssValue("spacing-4"),
                },
                py: {
                    xs: spacing.toCssValue("spacing-3"),
                    md: spacing.toCssValue("spacing-5"),
                },
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/backgrounds/background"
                    ],
            }}
        >
            <Stack spacing={4} sx={{ maxWidth: 1200, mx: "auto" }}>
                <Paper
                    variant="outlined"
                    sx={{
                        p: {
                            xs: spacing.toCssValue("spacing-4"),
                            md: spacing.toCssValue("spacing-5"),
                        },
                        backgroundColor:
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-primary"
                            ],
                        borderColor:
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-neutral-primary"
                            ],
                    }}
                >
                    <Stack spacing={2}>
                        <Typography
                            component="p"
                            variant="overline"
                            sx={{
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-color-secondary"
                                ],
                                letterSpacing: "0.14em",
                            }}
                        >
                            Components / SearchBar
                        </Typography>
                        <Typography component="h1" variant="h2">
                            {title}
                        </Typography>
                        <Typography
                            component="p"
                            variant="body1"
                            sx={{
                                maxWidth: 860,
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-secondary"
                                ],
                            }}
                        >
                            {summary}
                        </Typography>
                    </Stack>
                </Paper>
                {children}
            </Stack>
        </Box>
    );
}

function StorySection(props: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    const { title, description, children } = props;
    const theme = useTheme();
    const spacing = theme.onyxia.spacing;

    return (
        <Paper
            component="section"
            variant="outlined"
            sx={{
                p: {
                    xs: spacing.toCssValue("spacing-4"),
                    md: spacing.toCssValue("spacing-5"),
                },
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/surface/surface-primary"
                    ],
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
            }}
        >
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography component="h2" variant="h4">
                        {title}
                    </Typography>
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{
                            maxWidth: 820,
                            color: theme.onyxia.semantic.values[
                                "usecases/contents/content-secondary"
                            ],
                        }}
                    >
                        {description}
                    </Typography>
                </Stack>
                {children}
            </Stack>
        </Paper>
    );
}

function BarGrid(props: { children: React.ReactNode }) {
    return (
        <Grid container spacing={3}>
            {React.Children.map(props.children, child => (
                <Grid item xs={12}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}

function ExampleCard(props: {
    title: string;
    note?: string;
    children: React.ReactNode;
}) {
    const { title, note, children } = props;
    const theme = useTheme();

    return (
        <Stack spacing={2}>
            <Typography component="h3" variant="h6">
                {title}
            </Typography>
            {note !== undefined && (
                <Typography
                    component="p"
                    variant="caption"
                    sx={{
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-secondary"
                        ],
                    }}
                >
                    {note}
                </Typography>
            )}
            {children}
        </Stack>
    );
}

function ControlledSearchBar(props: SearchBarProps) {
    const [search, setSearch] = React.useState(props.search ?? "");

    return (
        <SearchBar
            {...props}
            search={search}
            onSearchChange={nextValue => {
                setSearch(nextValue);
                props.onSearchChange?.(nextValue);
            }}
        />
    );
}

function OverviewPage() {
    return (
        <StoryPage
            title="Overview"
            summary="The approved SearchBar is a dedicated compact search control with one size, a permanent leading search icon, and an active-state clear action."
        >
            <StorySection
                title="Baseline"
                description="The production component stays close to the legacy search behavior while using the new semantic theme and icon system."
            >
                <BarGrid>
                    <ExampleCard title="Search bar">
                        <ControlledSearchBar placeholder="Rechercher" />
                    </ExampleCard>
                </BarGrid>
            </StorySection>
        </StoryPage>
    );
}

function StatesPage() {
    return (
        <StoryPage
            title="States"
            summary="Default, hover, active, and active-with-value come directly from the Figma component set. Disabled is a runtime support state layered on top of that search model."
        >
            <StorySection
                title="Approved and runtime states"
                description="Storybook uses simulated data attributes only to expose transient visuals such as hover and active without introducing non-production props."
            >
                <Stack spacing={3}>
                    <ExampleCard title="Default">
                        <SearchBar placeholder="Rechercher" />
                    </ExampleCard>
                    <ExampleCard title="Hover">
                        <SearchBar
                            data-simulated-state="hover"
                            placeholder="Rechercher"
                        />
                    </ExampleCard>
                    <ExampleCard title="Active">
                        <SearchBar
                            autoFocus
                            clearButtonAriaLabel="Effacer la recherche"
                            placeholder="Rechercher"
                        />
                    </ExampleCard>
                    <ExampleCard title="Active with a value">
                        <SearchBar
                            data-simulated-state="active-has-value"
                            defaultValue="Rstu"
                            placeholder="Rechercher"
                        />
                    </ExampleCard>
                    <ExampleCard title="Disabled">
                        <SearchBar
                            defaultValue="Rechercher"
                            disabled
                            placeholder="Rechercher"
                        />
                    </ExampleCard>
                </Stack>
            </StorySection>
        </StoryPage>
    );
}

function SizesPage() {
    return (
        <StoryPage
            title="Sizes"
            summary="The current approved Figma SearchBar defines one size. This story documents that single production size instead of inventing another scale."
        >
            <StorySection
                title="Single approved size"
                description="The control height, padding, radius, icon size, and content gap all resolve through shared foundations."
            >
                <ExampleCard title="Default size">
                    <SearchBar placeholder="Rechercher" />
                </ExampleCard>
            </StorySection>
        </StoryPage>
    );
}

function FilledAndClearPage() {
    return (
        <StoryPage
            title="Filled and clear behavior"
            summary="The clear action is available only while active. It preserves the legacy restore-or-reset logic rather than behaving like a generic icon button."
        >
            <StorySection
                title="Filled interactions"
                description="Use these examples to validate how value presence, clear behavior, and restorable search interact."
            >
                <Stack spacing={3}>
                    <ExampleCard title="Filled search">
                        <ControlledSearchBar
                            placeholder="Rechercher"
                            search="Rstu"
                        />
                    </ExampleCard>
                    <ExampleCard
                        title="Restorable search"
                        note="Clearing keeps focus when a restorable value exists, matching the legacy component behavior."
                    >
                        <ControlledSearchBar
                            placeholder="Rechercher"
                            restorableSearch="Rechercher"
                            search="Rstu"
                        />
                    </ExampleCard>
                </Stack>
            </StorySection>
        </StoryPage>
    );
}

function AccessibilityPage() {
    return (
        <StoryPage
            title="Accessibility"
            summary="The SearchBar uses a real search input, keeps the leading icon decorative, and gives the clear action its own accessible label."
        >
            <StorySection
                title="Accessible naming and keyboard behavior"
                description="These examples show the intended naming strategy when the visual design has no external label."
            >
                <Stack spacing={3}>
                    <ExampleCard title="Named by aria-label">
                        <SearchBar
                            aria-label="Search datasets"
                            clearButtonAriaLabel="Clear dataset search"
                            placeholder="Rechercher"
                        />
                    </ExampleCard>
                    <ExampleCard
                        title="Read-only"
                        note="Read-only is supported for runtime integration, although the current Figma component set does not define a dedicated read-only visual state."
                    >
                        <SearchBar
                            aria-label="Search API keys"
                            defaultValue="readonly"
                            placeholder="Rechercher"
                            readOnly
                        />
                    </ExampleCard>
                </Stack>
            </StorySection>
        </StoryPage>
    );
}

function PlaygroundPage(args: PlaygroundArgs) {
    const restorableSearch =
        args.restorableSearch.trim() === "" ? undefined : args.restorableSearch;

    return (
        <StoryPage
            title="Playground"
            summary="Use Storybook globals for brand and light or dark mode, then adjust the search props here to validate the production component through the real Onyxia theme."
        >
            <StorySection
                title="Interactive playground"
                description="The playground renders the production SearchBar directly. No duplicate search-state logic is recreated in the story layer."
            >
                <ControlledSearchBar
                    autoFocus={args.autoFocus}
                    defaultValue={args.defaultValue}
                    disabled={args.disabled}
                    placeholder={args.placeholder}
                    readOnly={args.readOnly}
                    restorableSearch={restorableSearch}
                />
            </StorySection>
        </StoryPage>
    );
}

export default {
    title: "Components/SearchBar",
};

export const Overview = {
    render: () => <OverviewPage />,
};

export const States = {
    render: () => <StatesPage />,
};

export const Sizes = {
    render: () => <SizesPage />,
};

export const FilledAndClearBehavior = {
    name: "Filled / clear behavior",
    render: () => <FilledAndClearPage />,
};

export const Accessibility = {
    render: () => <AccessibilityPage />,
};

export const Playground = {
    args: {
        autoFocus: false,
        defaultValue: "",
        disabled: false,
        placeholder: "Rechercher",
        readOnly: false,
        restorableSearch: "",
    } satisfies PlaygroundArgs,
    render: (args: PlaygroundArgs) => <PlaygroundPage {...args} />,
};
