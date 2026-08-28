import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Icon, TextField } from "../../src";
import type { TextFieldProps } from "../../src/components/TextField";

type PlaygroundArgs = {
    defaultValue: string;
    disabled: boolean;
    error: boolean;
    fullWidth: boolean;
    helperText: string;
    helperTextError: string;
    label: string;
    placeholder: string;
    readOnly: boolean;
    required: boolean;
    type: TextFieldProps["type"];
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
                            Components / TextField
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

function FieldGrid(props: { children: React.ReactNode }) {
    return (
        <Grid container spacing={3}>
            {React.Children.map(props.children, child => (
                <Grid item xs={12} md={6}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}

function FieldCard(props: {
    title: string;
    children: React.ReactNode;
    note?: string;
}) {
    const { title, children, note } = props;
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

function OverviewPage() {
    return (
        <StoryPage
            title="Overview"
            summary="The approved TextField model uses one filled surface size with an external label, a trailing adornment slot, and semantic helper or error feedback."
        >
            <StorySection
                title="Baseline"
                description="The production component consumes the real Onyxia foundations rather than recreating field styles inside Storybook."
            >
                <FieldGrid>
                    <FieldCard title="Default">
                        <TextField
                            fullWidth
                            helperText="Helptext"
                            label="Textlabel"
                            placeholder="Text Input"
                        />
                    </FieldCard>
                    <FieldCard title="Filled">
                        <TextField
                            fullWidth
                            defaultValue="Text Input"
                            helperText="Helptext"
                            label="Textlabel"
                        />
                    </FieldCard>
                </FieldGrid>
            </StorySection>
        </StoryPage>
    );
}

function StatesPage() {
    return (
        <StoryPage
            title="States"
            summary="Default, hover, focus, filled, disabled, and error match the approved Figma states. Hover and focus are documented through simulated state attributes rather than non-production props."
        >
            <StorySection
                title="Approved states"
                description="The component keeps the state logic in runtime selectors while Storybook uses data attributes only to expose otherwise transient visuals."
            >
                <FieldGrid>
                    <FieldCard title="Default">
                        <TextField
                            fullWidth
                            helperText="Helptext"
                            label="Textlabel"
                            placeholder="Text Input"
                        />
                    </FieldCard>
                    <FieldCard title="Hover">
                        <TextField
                            fullWidth
                            data-simulated-state="hover"
                            helperText="Helptext"
                            label="Textlabel"
                            placeholder="Text Input"
                        />
                    </FieldCard>
                    <FieldCard title="Focus">
                        <TextField
                            fullWidth
                            data-simulated-state="focus"
                            defaultValue="Text Input"
                            helperText="Helptext"
                            label="Textlabel"
                        />
                    </FieldCard>
                    <FieldCard title="Filled">
                        <TextField
                            fullWidth
                            defaultValue="Text Input"
                            helperText="Helptext"
                            label="Textlabel"
                        />
                    </FieldCard>
                    <FieldCard title="Disabled">
                        <TextField
                            fullWidth
                            defaultValue="Text Input"
                            disabled
                            helperText="Helptext"
                            label="Textlabel"
                        />
                    </FieldCard>
                    <FieldCard title="Error">
                        <TextField
                            fullWidth
                            defaultValue="Text Input"
                            error
                            helperTextError="Helptext"
                            label="Textlabel"
                        />
                    </FieldCard>
                </FieldGrid>
            </StorySection>
        </StoryPage>
    );
}

function HelperAndErrorPage() {
    return (
        <StoryPage
            title="Helper and error"
            summary="Helper and error feedback share one slot. Non-error helper text keeps the informational affordance; error feedback adds an explicit status icon instead of relying on color alone."
        >
            <StorySection
                title="Supporting text"
                description="These examples focus on the supporting row rather than the input mechanics."
            >
                <FieldGrid>
                    <FieldCard title="Helper text">
                        <TextField
                            fullWidth
                            helperText="Use a clear and stable project name."
                            label="Project name"
                            placeholder="Onyxia design system"
                        />
                    </FieldCard>
                    <FieldCard title="Error message">
                        <TextField
                            fullWidth
                            defaultValue="x"
                            error
                            helperTextError="Project name must be at least 3 characters."
                            label="Project name"
                        />
                    </FieldCard>
                </FieldGrid>
            </StorySection>
        </StoryPage>
    );
}

function IconsPage() {
    return (
        <StoryPage
            title="Icons and adornments"
            summary="The approved component set exposes a trailing icon slot. The production component preserves the legacy end-adornment contract and uses the same slot for password visibility."
        >
            <StorySection
                title="Trailing adornments"
                description="No separate leading-icon or icon-only field variant is implemented because the inspected Figma component set did not define one."
            >
                <FieldGrid>
                    <FieldCard title="Password visibility">
                        <TextField
                            fullWidth
                            defaultValue="Pa$$w0rd"
                            helperText="Built-in password visibility toggle."
                            label="Password"
                            type="password"
                        />
                    </FieldCard>
                    <FieldCard title="Custom adornment">
                        <TextField
                            fullWidth
                            helperText="Custom end adornments use the same trailing slot."
                            label="Search"
                            placeholder="Query"
                            InputProps_endAdornment={
                                <Icon
                                    decorative
                                    icon={SearchOutlinedIcon}
                                    size="icon-size-4"
                                />
                            }
                        />
                    </FieldCard>
                </FieldGrid>
            </StorySection>
        </StoryPage>
    );
}

function AccessibilityPage() {
    return (
        <StoryPage
            title="Accessibility"
            summary="The field keeps a visible external label, connects helper and error text through `aria-describedby`, and preserves keyboard-focus and password-toggle semantics."
        >
            <StorySection
                title="Runtime accessibility behavior"
                description="These examples surface the supported non-visual states without introducing Storybook-only component variants."
            >
                <FieldGrid>
                    <FieldCard title="Required field">
                        <TextField
                            fullWidth
                            helperText="A visible label remains the primary name."
                            label="Email address"
                            placeholder="name@example.fr"
                            required
                            type="email"
                        />
                    </FieldCard>
                    <FieldCard
                        title="Read-only"
                        note="Read-only is supported for runtime compatibility, but the current Figma component set does not define a dedicated read-only visual state."
                    >
                        <TextField
                            fullWidth
                            defaultValue="readonly-value"
                            helperText="The value remains selectable but not editable."
                            label="API key"
                            readOnly
                        />
                    </FieldCard>
                </FieldGrid>
            </StorySection>
        </StoryPage>
    );
}

function PlaygroundPage(args: PlaygroundArgs) {
    const helperTextError =
        args.helperTextError.trim() === "" ? undefined : args.helperTextError;

    return (
        <StoryPage
            title="Playground"
            summary="Use Storybook globals for brand and light or dark mode, then adjust the field props here to validate the production component against the active semantic theme."
        >
            <StorySection
                title="Interactive playground"
                description="The field uses the same production component as the rest of the stories. No duplicate token resolution exists in the story layer."
            >
                <Box sx={{ maxWidth: 520 }}>
                    <TextField
                        defaultValue={args.defaultValue}
                        disabled={args.disabled}
                        error={args.error}
                        fullWidth={args.fullWidth}
                        helperText={args.helperText}
                        helperTextError={helperTextError}
                        label={args.label}
                        placeholder={args.placeholder}
                        readOnly={args.readOnly}
                        required={args.required}
                        type={args.type}
                    />
                </Box>
            </StorySection>
        </StoryPage>
    );
}

export default {
    title: "Components/TextField",
    argTypes: {
        type: {
            control: { type: "radio" },
            options: ["text", "email", "password", "sensitive"],
        },
    },
};

export const Overview = {
    render: () => <OverviewPage />,
};

export const States = {
    render: () => <StatesPage />,
};

export const HelperAndError = {
    name: "Helper & error",
    render: () => <HelperAndErrorPage />,
};

export const IconsAndAdornments = {
    name: "Icons / adornments",
    render: () => <IconsPage />,
};

export const Accessibility = {
    render: () => <AccessibilityPage />,
};

export const Playground = {
    args: {
        defaultValue: "",
        disabled: false,
        error: false,
        fullWidth: true,
        helperText: "Helptext",
        helperTextError: "Please correct the value.",
        label: "Textlabel",
        placeholder: "Text Input",
        readOnly: false,
        required: false,
        type: "text",
    } satisfies PlaygroundArgs,
    render: (args: PlaygroundArgs) => <PlaygroundPage {...args} />,
};
