import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Paper,
    Stack,
    SvgIcon,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    breakpointsValues,
    onyxiaSpacingTokenNames,
    type OnyxiaSpacingTokenName,
} from "../../src";
import { spacingTokens } from "../../src/tokens/generated/spacing";
import {
    FoundationPage,
    FoundationSection,
    FoundationSubsection,
    GuidanceList,
    KeyValueList,
    useViewportWidth,
} from "./FoundationDocs";

type SpacingDocumentationPageKey =
    | "overview"
    | "scale"
    | "relationships"
    | "component-examples"
    | "responsive-spacing"
    | "mui-integration";

type SpacingDocumentationPageProps = {
    page: SpacingDocumentationPageKey;
};

const spacingScale = onyxiaSpacingTokenNames.map(tokenName => ({
    tokenName,
    value: spacingTokens[tokenName],
}));

function SpacingTokenChip(props: { tokenName: OnyxiaSpacingTokenName }) {
    const { tokenName } = props;
    const theme = useTheme();

    return (
        <Box
            component="span"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid",
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
                borderRadius: theme.onyxia.radius.toCssValue("radius-full"),
                px: theme.spacing(2),
                py: theme.spacing(1),
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/surface/surface-secondary"
                    ],
                color: theme.onyxia.semantic.values[
                    "usecases/contents/content-primary"
                ],
            }}
        >
            {tokenName}
        </Box>
    );
}

function SpacingScaleCard(props: {
    tokenName: OnyxiaSpacingTokenName;
    value: number;
}) {
    const { tokenName, value } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(4),
                display: "grid",
                gap: theme.spacing(3),
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/surface/surface-secondary"
                    ],
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
            }}
        >
            <Stack spacing={1}>
                <Typography variant="subtitle2">{tokenName}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {value}px
                </Typography>
            </Stack>
            <Box
                sx={{
                    minHeight: theme.spacing(6),
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: value === 0 ? theme.spacing(1) : `${value}px`,
                        height: theme.spacing(2),
                        minWidth: value === 0 ? theme.spacing(1) : undefined,
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-full"),
                        backgroundColor:
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-action-primary"
                            ],
                    }}
                />
            </Box>
            <Typography variant="body2" color="text.secondary">
                Approved spacing token from the shared controlled scale.
            </Typography>
        </Paper>
    );
}

function RelationshipExample(props: {
    title: string;
    tokenName: OnyxiaSpacingTokenName;
    description: string;
    children: React.ReactNode;
}) {
    const { title, tokenName, description, children } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(4),
                display: "grid",
                gap: theme.spacing(3),
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/surface/surface-secondary"
                    ],
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
            }}
        >
            <Stack spacing={1}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <SpacingTokenChip tokenName={tokenName} />
            </Stack>
            {children}
        </Paper>
    );
}

function InlineStatus() {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <SvgIcon
                sx={{
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-info"
                    ],
                }}
            >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2Zm0-8h-2V7h2Z" />
            </SvgIcon>
            <Typography variant="body2">
                Connected to the approved spacing foundation.
            </Typography>
        </Stack>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Spacing"
            title="Spacing"
            summary="The Spacing foundation provides the approved layout distances used to express hierarchy, relationships, and rhythm without relying on arbitrary pixel values."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="Spacing helps users understand which pieces of content belong together, which groups are separate, and how dense or comfortable an interface should feel."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Base unit",
                            value: "The scale is based on a 4px unit.",
                        },
                        {
                            label: "Controlled scale",
                            value: "Only approved spacing tokens belong to the shared Design System.",
                        },
                        {
                            label: "Theme API",
                            value: "Components consume spacing through theme.onyxia.spacing.",
                        },
                        {
                            label: "MUI compatibility",
                            value: "MUI theme.spacing is mapped to the approved Onyxia scale instead of using an unrelated default multiplier.",
                        },
                    ]}
                />
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            lg: "repeat(2, minmax(0, 1fr))",
                        },
                    }}
                >
                    <GuidanceList
                        title="How to choose spacing"
                        items={[
                            "Choose spacing based on the relationship between elements.",
                            "Use smaller gaps for tightly related information.",
                            "Use larger gaps to separate groups and sections.",
                            "Prefer approved tokens over local pixel values when the decision belongs to the shared system.",
                        ]}
                    />
                    <GuidanceList
                        title="What to avoid"
                        items={[
                            "Do not treat every multiple of 4px as automatically approved.",
                            "Do not create local spacing scales in components or stories.",
                            "Do not make MUI the source of truth for spacing.",
                            "Do not invent responsive spacing values before they are approved in Figma.",
                        ]}
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ScalePage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Spacing"
            title="Scale consultation"
            summary="The approved spacing scale is a shared set of named tokens. It is intentionally smaller and more controlled than the full set of possible 4px multiples."
        >
            <FoundationSection
                title="Approved spacing tokens"
                description="Each specimen below comes from the generated spacing registry and the active Onyxia theme. The visual bar uses the token’s resolved pixel value."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(4, minmax(0, 1fr))",
                        },
                    }}
                >
                    {spacingScale.map(({ tokenName, value }) => (
                        <SpacingScaleCard
                            key={tokenName}
                            tokenName={tokenName}
                            value={value}
                        />
                    ))}
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function RelationshipsPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Spacing"
            title="Relationships and rhythm"
            summary="Spacing communicates how strongly content is related. The same scale supports dense local groupings, medium internal rhythm, and larger sectional separation."
        >
            <FoundationSection
                title="Relationship examples"
                description="These examples use the approved spacing scale to show how distance changes the perceived relationship between pieces of information."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            lg: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    <RelationshipExample
                        title="Small spacing"
                        tokenName="spacing-2"
                        description="A tight gap keeps closely related pieces of content together."
                    >
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">
                                Dataset status
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last refreshed 2 minutes ago
                            </Typography>
                            <InlineStatus />
                        </Stack>
                    </RelationshipExample>
                    <RelationshipExample
                        title="Medium spacing"
                        tokenName="spacing-4"
                        description="A moderate gap groups content inside one component or one local section."
                    >
                        <Stack spacing={4}>
                            <Typography variant="subtitle2">
                                Access request
                            </Typography>
                            <Typography variant="body2">
                                Review the environment and the expected project
                                scope before submitting.
                            </Typography>
                            <Button variant="contained" color="primary">
                                Continue
                            </Button>
                        </Stack>
                    </RelationshipExample>
                    <RelationshipExample
                        title="Large spacing"
                        tokenName="spacing-6"
                        description="A larger gap clearly separates major groups or sections."
                    >
                        <Stack spacing={6}>
                            <Box>
                                <Typography variant="subtitle2">
                                    Identity
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Account, profile, and permissions.
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant="subtitle2">
                                    Workspace
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Catalog, storage, and compute resources.
                                </Typography>
                            </Box>
                        </Stack>
                    </RelationshipExample>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ComponentExamplesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Spacing"
            title="Component examples"
            summary="Spacing tokens should support practical interface composition: control padding, internal rhythm, grouped fields, card layout, inline gaps, and section spacing."
        >
            <FoundationSection
                title="Representative usage"
                description="These examples use real MUI primitives and explicit Onyxia spacing tokens. They are fixtures for consultation and validation, not new production components."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            xl: "repeat(2, minmax(0, 1fr))",
                        },
                    }}
                >
                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Button and inline spacing
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={3}
                                useFlexGap
                                flexWrap="wrap"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        px: theme.spacing(3),
                                        py: theme.spacing(2),
                                    }}
                                >
                                    Primary action
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        px: theme.spacing(3),
                                        py: theme.spacing(2),
                                    }}
                                >
                                    Secondary action
                                </Button>
                            </Stack>
                            <InlineStatus />
                        </Stack>
                    </Paper>

                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={4}>
                            <Typography variant="h6">
                                Form-field stacking and input spacing
                            </Typography>
                            <Stack spacing={3}>
                                <TextField
                                    label="Project name"
                                    fullWidth
                                    helperText="Internal input padding uses approved spacing through the theme."
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            px: theme.spacing(3),
                                            py: theme.spacing(2),
                                        },
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    helperText="Vertical field stacking also uses approved spacing."
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            px: theme.spacing(3),
                                            py: theme.spacing(2),
                                        },
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Paper>

                    <Card variant="outlined">
                        <CardContent
                            sx={{
                                p: `${theme.spacing(4)} !important`,
                            }}
                        >
                            <Stack spacing={4}>
                                <Typography variant="h6">
                                    Card content rhythm
                                </Typography>
                                <Typography variant="body2">
                                    Approved spacing tokens create the internal
                                    reading rhythm of the card.
                                </Typography>
                                <Alert severity="info">
                                    Support information stays grouped with a
                                    moderate internal gap.
                                </Alert>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Paper variant="outlined" sx={{ p: theme.spacing(5) }}>
                        <Stack spacing={5}>
                            <Typography variant="h6">
                                Section spacing
                            </Typography>
                            <Box>
                                <Typography variant="subtitle2">
                                    Foundation documentation
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Uses tighter local spacing inside a section.
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant="subtitle2">
                                    Implementation validation
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Uses larger spacing to separate distinct
                                    groups of content.
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ResponsiveSpacingPage() {
    const theme = useTheme();
    const viewportWidth = useViewportWidth();
    const resolvedToken =
        theme.onyxia.spacing.responsive.resolve<OnyxiaSpacingTokenName>({
            xs: "spacing-4",
        });

    return (
        <FoundationPage
            foundation="Spacing"
            title="Responsive spacing"
            summary="Responsive spacing is prepared at the theme level without inventing a second spacing scale. The approved token set remains the same across breakpoints."
        >
            <FoundationSection
                title="Current responsive state"
                description="Use the Storybook viewport controls or resize the canvas to inspect the active breakpoint. The same approved spacing scale stays available in every viewport."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Viewport width",
                            value:
                                viewportWidth === 0
                                    ? "Unavailable"
                                    : `${viewportWidth}px`,
                        },
                        {
                            label: "Active breakpoint",
                            value: theme.onyxia.spacing.responsive
                                .activeBreakpoint,
                        },
                        {
                            label: "Current responsive behavior",
                            value: "No spacing-specific breakpoint overrides are approved yet.",
                        },
                        {
                            label: "Current neutral resolver example",
                            value: `${resolvedToken} → ${theme.onyxia.spacing.toCssValue(
                                resolvedToken,
                            )}`,
                        },
                    ]}
                />
                <Alert severity="info">
                    Future responsive layouts may choose different approved
                    spacing tokens at different breakpoints, but they should not
                    create a separate spacing scale.
                </Alert>
            </FoundationSection>

            <FoundationSection
                title="Breakpoint consultation"
                description="The breakpoint system is shared with the rest of the theme. The spacing foundation is prepared to resolve future responsive selections centrally."
            >
                <Box
                    component="table"
                    sx={{
                        width: "100%",
                        borderCollapse: "collapse",
                        "& th, & td": {
                            textAlign: "left",
                            borderBottom: "1px solid",
                            borderColor:
                                theme.onyxia.semantic.values[
                                    "usecases/borders/border-neutral-primary"
                                ],
                            py: theme.spacing(2),
                            px: 1,
                        },
                    }}
                >
                    <Box component="thead">
                        <Box component="tr">
                            <Box component="th">Breakpoint</Box>
                            <Box component="th">Viewport range</Box>
                            <Box component="th">Spacing scale</Box>
                        </Box>
                    </Box>
                    <Box component="tbody">
                        {[
                            ["xs", `< ${breakpointsValues.sm}px`],
                            [
                                "sm",
                                `${breakpointsValues.sm}px - ${
                                    breakpointsValues.md - 1
                                }px`,
                            ],
                            [
                                "md",
                                `${breakpointsValues.md}px - ${
                                    breakpointsValues.lg - 1
                                }px`,
                            ],
                            [
                                "lg",
                                `${breakpointsValues.lg}px - ${
                                    breakpointsValues.xl - 1
                                }px`,
                            ],
                            ["xl", `≥ ${breakpointsValues.xl}px`],
                        ].map(([breakpoint, range]) => (
                            <Box component="tr" key={breakpoint}>
                                <Box component="td">{breakpoint}</Box>
                                <Box component="td">{range}</Box>
                                <Box component="td">
                                    Shared approved spacing tokens
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function MuiIntegrationPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Spacing"
            title="MUI integration"
            summary="The Onyxia spacing system remains the source of truth. MUI receives a controlled compatibility mapping through theme.spacing so MUI primitives can stay aligned with the approved scale."
        >
            <FoundationSection
                title="Compatibility mapping"
                description="Numeric MUI spacing factors resolve to approved spacing token indexes rather than to an unrestricted linear multiplier."
            >
                <KeyValueList
                    items={spacingScale.map(({ tokenName, value }) => ({
                        label: `theme.spacing(${tokenName.replace(
                            "spacing-",
                            "",
                        )})`,
                        value: `${value}px`,
                    }))}
                />
            </FoundationSection>

            <FoundationSection
                title="Primitive validation"
                description="These MUI primitives consume the real theme spacing bridge. The Onyxia spacing system stays authoritative while MUI remains a compatibility layer."
            >
                <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                    <Stack spacing={4}>
                        <Stack
                            direction="row"
                            spacing={3}
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    px: theme.spacing(3),
                                    py: theme.spacing(2),
                                }}
                            >
                                Button padding
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    px: theme.spacing(3),
                                    py: theme.spacing(2),
                                }}
                            >
                                Secondary button
                            </Button>
                        </Stack>
                        <Stack spacing={3}>
                            <TextField
                                label="MUI input"
                                helperText="Uses the same approved spacing bridge."
                                fullWidth
                            />
                            <Alert severity="success">
                                Alert content with surrounding layout spacing
                                from the approved scale.
                            </Alert>
                        </Stack>
                        <Card variant="outlined">
                            <CardContent
                                sx={{
                                    p: `${theme.spacing(4)} !important`,
                                }}
                            >
                                <Stack spacing={3}>
                                    <Typography variant="subtitle1">
                                        Card layout
                                    </Typography>
                                    <Typography variant="body2">
                                        Card content rhythm uses approved
                                        spacing tokens through the MUI bridge.
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Paper>
            </FoundationSection>
        </FoundationPage>
    );
}

export function SpacingDocumentationPage(props: SpacingDocumentationPageProps) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "scale":
            return <ScalePage />;
        case "relationships":
            return <RelationshipsPage />;
        case "component-examples":
            return <ComponentExamplesPage />;
        case "responsive-spacing":
            return <ResponsiveSpacingPage />;
        case "mui-integration":
            return <MuiIntegrationPage />;
        default:
            return null;
    }
}
