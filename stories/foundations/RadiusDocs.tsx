import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { onyxiaRadiusTokenNames, type OnyxiaRadiusTokenName } from "../../src";
import { radiusTokens } from "../../src/tokens/generated/radius";
import {
    FoundationPage,
    FoundationSection,
    FoundationSubsection,
    GuidanceList,
    KeyValueList,
    useViewportWidth,
} from "./FoundationDocs";

type RadiusDocumentationPageKey =
    | "overview"
    | "scale"
    | "full-radius"
    | "hierarchy"
    | "component-examples"
    | "responsive-context"
    | "mui-integration";

type RadiusDocumentationPageProps = {
    page: RadiusDocumentationPageKey;
};

const radiusScale = onyxiaRadiusTokenNames.map(tokenName => ({
    tokenName,
    value: radiusTokens[tokenName],
}));

function RadiusTokenChip(props: { tokenName: OnyxiaRadiusTokenName }) {
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

function RadiusScaleCard(props: {
    tokenName: OnyxiaRadiusTokenName;
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
                    height: 88,
                    borderRadius: theme.onyxia.radius.toCssValue(tokenName),
                    border: "1px solid",
                    borderColor:
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                }}
            />
            <Typography variant="body2" color="text.secondary">
                Approved radius token from the shared controlled scale.
            </Typography>
        </Paper>
    );
}

function RadiusHierarchyCard(props: {
    title: string;
    tokenName: OnyxiaRadiusTokenName;
    description: string;
}) {
    const { title, tokenName, description } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(4),
                display: "grid",
                gap: theme.spacing(3),
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/surface/surface-secondary"
                    ],
            }}
        >
            <Box
                sx={{
                    minHeight: 96,
                    borderRadius: theme.onyxia.radius.toCssValue(tokenName),
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    border: "1px solid",
                    borderColor:
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Typography variant="body2">{tokenName}</Typography>
            </Box>
            <Stack spacing={1}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <RadiusTokenChip tokenName={tokenName} />
            </Stack>
        </Paper>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Radius"
            title="Border Radius"
            summary="The Radius foundation defines the approved corner treatments that give Onyxia surfaces and controls their structure, softness, and visual identity."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="Corner treatment is part of the design language. A controlled radius scale keeps component shape decisions consistent across brands, themes, and future migration work."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Source of truth",
                            value: "Approved radius tokens come from the Figma Design System.",
                        },
                        {
                            label: "Public API",
                            value: "Components consume radius through theme.onyxia.radius.",
                        },
                        {
                            label: "Semantic special case",
                            value: "radius-full expresses a fully rounded result, not just a larger numeric step.",
                        },
                        {
                            label: "MUI compatibility",
                            value: "MUI receives a base shape radius plus explicit overrides where generic defaults are not enough.",
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
                        title="How to choose radius"
                        items={[
                            "Use smaller radii for dense, structured, or utility-oriented elements.",
                            "Use larger radii when a surface needs more softness or prominence.",
                            "Use radius-full only when a fully rounded pill, capsule, or circular result is intended.",
                            "Prefer approved tokens over local visual preference.",
                        ]}
                    />
                    <GuidanceList
                        title="What to avoid"
                        items={[
                            "Do not invent intermediate radius values because they seem visually close.",
                            "Do not treat MUI shape.borderRadius as the design-system source of truth.",
                            "Do not create local component radius scales.",
                            "Do not use radius-full for every large surface.",
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
            foundation="Radius"
            title="Scale consultation"
            summary="The approved radius scale is intentionally small and controlled. Each specimen below uses the generated radius registry and the active Onyxia theme."
        >
            <FoundationSection
                title="Approved radius tokens"
                description="Every specimen uses the actual Onyxia radius token name and resolved value. The final visual result depends on the same theme API used by components."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    {radiusScale.map(({ tokenName, value }) => (
                        <RadiusScaleCard
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

function FullRadiusPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Radius"
            title="Fully rounded treatment"
            summary="radius-full is a semantic fully rounded value. It expresses pill, capsule, and circular geometry rather than an ordinary step of the numeric scale."
        >
            <FoundationSection
                title="radius-full behavior"
                description="The same token produces different fully rounded results depending on the geometry of the element. The semantic intent remains the same."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            md: "repeat(2, minmax(0, 1fr))",
                        },
                    }}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            p: theme.spacing(4),
                            display: "grid",
                            gap: theme.spacing(3),
                        }}
                    >
                        <Typography variant="h6">
                            Pill-shaped surface
                        </Typography>
                        <Box
                            sx={{
                                minHeight: 56,
                                borderRadius:
                                    theme.onyxia.radius.toCssValue(
                                        "radius-full",
                                    ),
                                backgroundColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/surface/surface-action-primary"
                                    ],
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-inverse"
                                ],
                                display: "grid",
                                placeItems: "center",
                                px: theme.spacing(4),
                            }}
                        >
                            <Typography variant="body2">
                                Fully rounded pill
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Appropriate when the shape itself is meant to read
                            as a capsule or pill.
                        </Typography>
                    </Paper>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: theme.spacing(4),
                            display: "grid",
                            gap: theme.spacing(3),
                        }}
                    >
                        <Typography variant="h6">Square to circle</Typography>
                        <Box
                            sx={{
                                width: 72,
                                height: 72,
                                borderRadius:
                                    theme.onyxia.radius.toCssValue(
                                        "radius-full",
                                    ),
                                backgroundColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/surface/surface-action-secondary"
                                    ],
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-inverse"
                                ],
                                display: "grid",
                                placeItems: "center",
                            }}
                        >
                            <Typography variant="caption">DS</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            The token keeps the semantic intent of full rounding
                            while the final result follows the element’s
                            dimensions.
                        </Typography>
                    </Paper>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function HierarchyPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Radius"
            title="Hierarchy and character"
            summary="Corner treatment contributes to how structured, standard, soft, or expressive a component feels. These examples are guidance, not fixed component mappings."
        >
            <FoundationSection
                title="Comparing radius levels"
                description="The same specimen becomes more structured or softer as the radius token changes. Component meaning and context still matter."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            lg: "repeat(4, minmax(0, 1fr))",
                        },
                    }}
                >
                    <RadiusHierarchyCard
                        title="Small radius"
                        tokenName="radius-1"
                        description="Dense or structured elements can use tighter rounding when precision is more important than softness."
                    />
                    <RadiusHierarchyCard
                        title="Standard radius"
                        tokenName="radius-2"
                        description="A balanced default for general surfaces and controls when no stronger shape signal is required."
                    />
                    <RadiusHierarchyCard
                        title="Large radius"
                        tokenName="radius-4"
                        description="Softer surfaces can use larger approved tokens when prominence or warmth is appropriate."
                    />
                    <RadiusHierarchyCard
                        title="Full radius"
                        tokenName="radius-full"
                        description="Use only when the intended visual character is fully rounded rather than merely soft."
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ComponentExamplesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Radius"
            title="Component examples"
            summary="These examples use the real Onyxia theme and the current MUI integration layer. They show how approved radius tokens appear on representative UI primitives."
        >
            <FoundationSection
                title="Representative rounded components"
                description="These specimens validate the current radius integration for structured inputs, pill-like actions, standard surfaces, and alert containers."
            >
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
                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Structured controls
                            </Typography>
                            <TextField
                                fullWidth
                                label="Dataset name"
                                placeholder="Type here"
                                helperText="Outlined input uses the approved base control radius."
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: theme.spacing(2),
                                    flexWrap: "wrap",
                                }}
                            >
                                <Chip label="radius-full chip" />
                                <Chip label="Selected" color="primary" />
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Interactive emphasis
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: theme.spacing(2),
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button variant="contained">Primary</Button>
                                <Button variant="contained" color="secondary">
                                    Secondary
                                </Button>
                                <Button variant="contained" color="error">
                                    Destructive
                                </Button>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Contained actions preserve the fully rounded
                                button philosophy already used in `onyxia-ui`.
                            </Typography>
                        </Stack>
                    </Paper>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant="h6">
                                    Standard surface
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Generic MUI surfaces consume the approved
                                    compatibility radius through
                                    `theme.shape.borderRadius`.
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Alert severity="info">
                        Informational status surfaces use the same approved
                        radius scale without inventing local values.
                    </Alert>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ResponsiveContextPage() {
    const theme = useTheme();
    const viewportWidth = useViewportWidth();

    return (
        <FoundationPage
            foundation="Radius"
            title="Responsive and contextual usage"
            summary="The radius scale itself stays stable across breakpoints. Responsive work may later select different approved tokens when the design system requires it, but it must not create a new radius scale."
        >
            <FoundationSection
                title="Current behavior"
                description="There is no separate responsive radius mode today. The viewport can change, but the approved radius vocabulary remains the same."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Viewport width",
                            value: `${viewportWidth}px`,
                        },
                        {
                            label: "Active breakpoint",
                            value: theme.onyxia.spacing.responsive
                                .activeBreakpoint,
                        },
                        {
                            label: "Current rule",
                            value: "Components may later choose different approved tokens by breakpoint, but the shared scale does not change.",
                        },
                        {
                            label: "What is avoided",
                            value: "No radius-specific breakpoint system and no invented responsive scale.",
                        },
                    ]}
                />
                <FoundationSubsection
                    title="Same scale, different contexts"
                    description="These specimens deliberately stay the same across viewport controls to show that the foundation remains stable even when the layout changes."
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
                        {(
                            [
                                "radius-1",
                                "radius-2",
                                "radius-4",
                                "radius-full",
                            ] as const
                        ).map(tokenName => (
                            <Box
                                key={tokenName}
                                sx={{
                                    p: theme.spacing(3),
                                    borderRadius:
                                        theme.onyxia.radius.toCssValue(
                                            tokenName,
                                        ),
                                    border: "1px solid",
                                    borderColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/borders/border-neutral-primary"
                                        ],
                                    backgroundColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/surface/surface-secondary"
                                        ],
                                }}
                            >
                                <Typography variant="body2">
                                    {tokenName}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </FoundationSubsection>
            </FoundationSection>
        </FoundationPage>
    );
}

function MuiIntegrationPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Radius"
            title="MUI integration"
            summary="MUI consumes a focused radius compatibility layer. The full foundation remains available through theme.onyxia.radius, while MUI receives only the behavior needed for framework primitives."
        >
            <FoundationSection
                title="Compatibility mapping"
                description="The current MUI integration uses one approved base radius for generic rounded surfaces, then applies explicit Onyxia overrides where the intended corner treatment is more specific."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Onyxia source of truth",
                            value: "theme.onyxia.radius",
                        },
                        {
                            label: "MUI base shape",
                            value: `${theme.shape.borderRadius}px`,
                        },
                        {
                            label: "Contained button override",
                            value: "radius-full",
                        },
                        {
                            label: "Outlined input and alert override",
                            value: "radius-2",
                        },
                    ]}
                />
                <FoundationSubsection
                    title="Representative MUI primitives"
                    description="These examples validate the base shape mapping and the explicit component overrides currently in use."
                >
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
                        <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                            <Stack spacing={3}>
                                <Typography variant="h6">
                                    Base shape consumers
                                </Typography>
                                <Paper
                                    variant="outlined"
                                    sx={{ p: theme.spacing(3) }}
                                >
                                    Paper uses the generic MUI rounded surface
                                    behavior.
                                </Paper>
                                <Card variant="outlined">
                                    <CardContent>
                                        Card inherits the same approved base
                                        compatibility radius.
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Paper>
                        <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                            <Stack spacing={3}>
                                <Typography variant="h6">
                                    Explicit Onyxia overrides
                                </Typography>
                                <Button variant="contained">
                                    Fully rounded action
                                </Button>
                                <TextField
                                    fullWidth
                                    label="Search"
                                    placeholder="Structured control"
                                />
                                <Alert severity="success">
                                    Alert surfaces keep an approved standard
                                    radius.
                                </Alert>
                            </Stack>
                        </Paper>
                    </Box>
                </FoundationSubsection>
            </FoundationSection>
        </FoundationPage>
    );
}

export function RadiusDocumentationPage(props: RadiusDocumentationPageProps) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "scale":
            return <ScalePage />;
        case "full-radius":
            return <FullRadiusPage />;
        case "hierarchy":
            return <HierarchyPage />;
        case "component-examples":
            return <ComponentExamplesPage />;
        case "responsive-context":
            return <ResponsiveContextPage />;
        case "mui-integration":
            return <MuiIntegrationPage />;
        default:
            return null;
    }
}
