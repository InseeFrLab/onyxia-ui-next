import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import EastIcon from "@mui/icons-material/East";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Button } from "../../src";
import type {
    ButtonProps,
    ButtonSize,
    ButtonVariant,
} from "../../src/components/Button";

type PlaygroundArgs = {
    disabled: boolean;
    endIcon: boolean;
    href: string;
    size: ButtonSize;
    startIcon: boolean;
    variant: Exclude<ButtonVariant, "ternary">;
    label: string;
};

const visibleVariants = [
    "primary",
    "secondary",
    "tertiary",
    "text",
] as const satisfies ReadonlyArray<Exclude<ButtonVariant, "ternary">>;
const sizes = [
    "small",
    "medium",
    "large",
] as const satisfies ReadonlyArray<ButtonSize>;
const states = ["default", "hover", "pressed", "focus", "disabled"] as const;

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
                            Components / Button
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

function VariantRow(props: {
    size?: ButtonSize;
    simulatedState?: "hover" | "pressed" | "focus";
    disabled?: boolean;
    startIcon?: boolean;
    endIcon?: boolean;
}) {
    const {
        size = "medium",
        simulatedState,
        disabled = false,
        startIcon = true,
        endIcon = true,
    } = props;

    return (
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {visibleVariants.map(variant => (
                <Button
                    key={`${variant}-${size}-${simulatedState ?? "default"}-${
                        disabled ? "disabled" : "enabled"
                    }`}
                    variant={variant}
                    size={size}
                    disabled={disabled}
                    data-simulated-state={simulatedState}
                    startIcon={startIcon ? AutorenewIcon : undefined}
                    endIcon={endIcon ? AutorenewOutlinedIcon : undefined}
                >
                    Button label
                </Button>
            ))}
        </Stack>
    );
}

function StateMatrix() {
    const theme = useTheme();

    return (
        <Stack spacing={3}>
            {states.map(state => (
                <Stack
                    key={state}
                    spacing={2}
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                >
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{
                            width: { md: 120 },
                            textTransform: "capitalize",
                            color: theme.onyxia.semantic.values[
                                "usecases/contents/content-secondary"
                            ],
                        }}
                    >
                        {state}
                    </Typography>
                    <VariantRow
                        disabled={state === "disabled"}
                        simulatedState={
                            state === "default" || state === "disabled"
                                ? undefined
                                : state
                        }
                    />
                </Stack>
            ))}
        </Stack>
    );
}

function SizeMatrix() {
    return (
        <Stack spacing={3}>
            {sizes.map(size => (
                <Stack key={size} spacing={2}>
                    <Typography component="h3" variant="h6">
                        {size[0].toUpperCase()}
                        {size.slice(1)}
                    </Typography>
                    <VariantRow size={size} />
                </Stack>
            ))}
        </Stack>
    );
}

function PlaygroundRender(args: PlaygroundArgs) {
    const { label, variant, size, disabled, href, startIcon, endIcon } = args;

    return (
        <StoryPage
            title="Playground"
            summary="Use the real production Button with the active branding, color mode, and viewport controls to validate integration behavior."
        >
            <StorySection
                title="Interactive preview"
                description="The playground maps directly to the production Button component. Icons, link behavior, disabled behavior, and size changes all use the same runtime path as application code."
            >
                <Stack spacing={3} alignItems="flex-start">
                    <Button
                        variant={variant}
                        size={size}
                        disabled={disabled}
                        href={href.trim() === "" ? undefined : href}
                        startIcon={startIcon ? AutorenewIcon : undefined}
                        endIcon={endIcon ? EastIcon : undefined}
                    >
                        {label}
                    </Button>
                    <Typography variant="body2">
                        External links open in a new tab automatically unless
                        `doOpenNewTabIfHref` is explicitly disabled.
                    </Typography>
                </Stack>
            </StorySection>
        </StoryPage>
    );
}

const meta = {
    title: "Components/Button",
    component: Button,
    args: {
        label: "Button label",
        variant: "primary",
        size: "medium",
        disabled: false,
        href: "",
        startIcon: true,
        endIcon: false,
    },
    argTypes: {
        variant: {
            control: "radio",
            options: visibleVariants,
        },
        size: {
            control: "radio",
            options: sizes,
        },
        disabled: {
            control: "boolean",
        },
        href: {
            control: "text",
        },
        startIcon: {
            control: "boolean",
        },
        endIcon: {
            control: "boolean",
        },
        label: {
            control: "text",
        },
    },
};

export default meta;

export const Overview = {
    render: () => (
        <StoryPage
            title="Overview"
            summary="The Button keeps the familiar `onyxia-ui` React contract for variants, icons, submit buttons, and href behavior while applying the new Figma styles and foundation mappings."
        >
            <StorySection
                title="Representative set"
                description="This view combines the four approved visual styles, the three Figma sizes, and the shared icon pattern used by the production component."
            >
                <SizeMatrix />
            </StorySection>
        </StoryPage>
    ),
};

export const Variants = {
    render: () => (
        <StoryPage
            title="Variants"
            summary="Primary, Secondary, Tertiary, and Text are resolved from semantic surface and content tokens instead of local color constants."
        >
            <StorySection
                title="Variant comparison"
                description="The same content model is rendered once per visual style so differences remain attributable to the semantic token mapping."
            >
                <VariantRow size="medium" />
            </StorySection>
        </StoryPage>
    ),
};

export const Sizes = {
    render: () => (
        <StoryPage
            title="Sizes"
            summary="Small, Medium, and Large differ through semantic typography, spacing, and icon-size mappings rather than a component-local numeric scale."
        >
            <StorySection
                title="Size scale"
                description="Each size row uses the same variants to make padding, label hierarchy, and icon dimensions easier to compare."
            >
                <SizeMatrix />
            </StorySection>
        </StoryPage>
    ),
};

export const States = {
    render: () => (
        <StoryPage
            title="States"
            summary="Default, hover, pressed, focus-visible, and disabled behaviors are rendered through the real component styling. Hover, pressed, and focus-visible are simulated only for visual documentation."
        >
            <StorySection
                title="State matrix"
                description="Disabled uses the real `disabled` prop. The documentation-only simulated state attribute is used only to expose visual pseudo-states in Storybook."
            >
                <StateMatrix />
            </StorySection>
        </StoryPage>
    ),
};

export const Icons = {
    render: () => (
        <StoryPage
            title="Icons"
            summary="Left and right icons reuse the shared Icon component and semantic icon sizes, so icon dimensions continue to resolve through the Sizing foundation."
        >
            <StorySection
                title="Supported icon placements"
                description="The production Button supports text-only, start-icon, end-icon, and dual-icon layouts. Icon-only actions remain the responsibility of dedicated icon-button patterns."
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                            <Button variant="primary" size="medium">
                                Text only
                            </Button>
                            <Button
                                variant="secondary"
                                size="medium"
                                startIcon={AutorenewIcon}
                            >
                                Start icon
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                            <Button
                                variant="tertiary"
                                size="medium"
                                endIcon={EastIcon}
                            >
                                End icon
                            </Button>
                            <Button
                                variant="text"
                                size="medium"
                                startIcon={AutorenewIcon}
                                endIcon={AutorenewOutlinedIcon}
                            >
                                Dual icon
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </StorySection>
        </StoryPage>
    ),
};

export const Accessibility = {
    render: () => (
        <StoryPage
            title="Accessibility"
            summary="Visible labels provide the primary accessible name, icons remain decorative by default, and focus-visible uses the semantic focus treatment rather than browser-default colors."
        >
            <StorySection
                title="Interaction patterns"
                description="These examples cover standard action buttons, submit buttons, and link-style behavior while keeping the accessible label anchored in visible text."
            >
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        spacing={2}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Button
                            variant="primary"
                            size="medium"
                            startIcon={AutorenewIcon}
                        >
                            Save changes
                        </Button>
                        <Button variant="secondary" size="medium" type="submit">
                            Submit form
                        </Button>
                        <Button
                            variant="text"
                            size="medium"
                            href="https://example.com/docs/button"
                            endIcon={EastIcon}
                        >
                            Open documentation
                        </Button>
                    </Stack>
                    <Typography variant="body2">
                        Decorative icons are not announced separately. Buttons
                        without visible text should use a dedicated icon-button
                        pattern with an explicit accessible name instead.
                    </Typography>
                    <Typography variant="body2">
                        Link preview:{" "}
                        <Link href="https://example.com/docs/button">
                            external reference
                        </Link>
                    </Typography>
                </Stack>
            </StorySection>
        </StoryPage>
    ),
};

export const Playground = {
    render: PlaygroundRender,
};
