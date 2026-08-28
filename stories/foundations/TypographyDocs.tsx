import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";
import {
    breakpointsValues,
    onyxiaBrandModes,
    typographyModeByBreakpoint,
} from "../../src";
import {
    typographyStyleTokensByMode,
    typographyTypefacesByBrand,
} from "../../src/tokens/generated/typography";
import {
    FoundationPage,
    FoundationSection,
    FoundationSubsection,
    GuidanceList,
    KeyValueList,
    useViewportWidth,
} from "./FoundationDocs";

type TypographyDocumentationPageKey =
    | "overview"
    | "typefaces"
    | "semantic-hierarchy"
    | "responsive-typography"
    | "mui-mapping";

type TypographyDocumentationPageProps = {
    page: TypographyDocumentationPageKey;
};

const currentTypographyTree = typographyStyleTokensByMode.default;

const hierarchySamples = [
    {
        name: "display/lg",
        sample: "Build public services with confident typography",
        stylePath: ["display", "lg"],
        contentRole:
            "Exceptional, high-impact content such as a hero section or landing page.",
    },
    {
        name: "display/sm",
        sample: "Progressive design-system foundations",
        stylePath: ["display", "sm"],
        contentRole:
            "A smaller display option that still carries strong visual emphasis.",
    },
    {
        name: "heading/xl",
        sample: "Typography hierarchy",
        stylePath: ["heading", "xl"],
        contentRole: "Page-level structural heading.",
    },
    {
        name: "heading/lg",
        sample: "Brand-aware typefaces",
        stylePath: ["heading", "lg"],
        contentRole: "Large section heading.",
    },
    {
        name: "heading/md",
        sample: "Semantic styles stay stable across brands",
        stylePath: ["heading", "md"],
        contentRole: "Subsection heading.",
    },
    {
        name: "heading/sm",
        sample: "Approved styles should be consumed directly",
        stylePath: ["heading", "sm"],
        contentRole: "Compact structural heading.",
    },
    {
        name: "label/lg",
        sample: "Large label",
        stylePath: ["label", "lg"],
        contentRole:
            "Reading marker or emphatic local title inside an existing section.",
    },
    {
        name: "label/md/default",
        sample: "Medium label default",
        stylePath: ["label", "md", "default"],
        contentRole:
            "Neutral emphasis or local group marker inside already-structured content.",
    },
    {
        name: "label/md/semibold",
        sample: "Medium label semibold",
        stylePath: ["label", "md", "semibold"],
        contentRole:
            "A stronger internal marker without becoming a structural heading.",
    },
    {
        name: "label/md/bold",
        sample: "Medium label bold",
        stylePath: ["label", "md", "bold"],
        contentRole:
            "High local emphasis for metadata, navigation, or grouped UI content.",
    },
    {
        name: "label/sm",
        sample: "Small label",
        stylePath: ["label", "sm"],
        contentRole:
            "Dense interface marker for compact UI and supporting emphasis.",
    },
    {
        name: "body/lg",
        sample: "The Onyxia semantic theme remains the canonical typography API for components.",
        stylePath: ["body", "lg"],
        contentRole: "Primary long-form reading content.",
    },
    {
        name: "body/md",
        sample: "Shared style metrics stay independent from MUI and resolve through semantic typeface roles.",
        stylePath: ["body", "md"],
        contentRole: "Default interface reading size.",
    },
    {
        name: "body/sm",
        sample: "Smaller interface text still uses the approved semantic scale.",
        stylePath: ["body", "sm"],
        contentRole: "Dense secondary reading content.",
    },
    {
        name: "caption/md",
        sample: "Captions and helper text should not invent their own scale.",
        stylePath: ["caption", "md"],
        contentRole: "Secondary supporting information.",
    },
    {
        name: "code/lg",
        sample: "const foundation = theme.onyxia.typography;",
        stylePath: ["code", "lg"],
        contentRole: "Prominent technical or monospace content.",
    },
    {
        name: "code/md",
        sample: "fontFamily resolves from the secondary typeface role.",
        stylePath: ["code", "md"],
        contentRole: "Default technical content.",
    },
    {
        name: "code/sm",
        sample: "npm run generate:tokens",
        stylePath: ["code", "sm"],
        contentRole: "Compact monospace detail.",
    },
];

const shippedTypefaceWeights: Record<string, number[]> = {
    "IBM Plex Mono": [400],
    Marianne: [400, 500, 700],
    "Work Sans": [400, 500, 600, 700],
};

const requiredWeightsByRole = getRequiredWeightsByRole();

const muiMappings = [
    { muiVariant: "h1", onyxiaStyle: "heading/xl" },
    { muiVariant: "h2", onyxiaStyle: "heading/lg" },
    { muiVariant: "h3", onyxiaStyle: "heading/md" },
    { muiVariant: "h4", onyxiaStyle: "heading/sm" },
    { muiVariant: "h5", onyxiaStyle: "label/lg" },
    { muiVariant: "h6", onyxiaStyle: "label/md/default" },
    { muiVariant: "subtitle1", onyxiaStyle: "body/lg" },
    { muiVariant: "subtitle2", onyxiaStyle: "body/md" },
    { muiVariant: "body1", onyxiaStyle: "body/md" },
    { muiVariant: "body2", onyxiaStyle: "body/sm" },
    { muiVariant: "button", onyxiaStyle: "label/md/default" },
    { muiVariant: "caption", onyxiaStyle: "caption/md" },
    { muiVariant: "overline", onyxiaStyle: "label/sm" },
];

function getStyleFromPath(theme: Theme, path: string[]) {
    return path.reduce<any>(
        (current, segment) => current[segment],
        theme.onyxia.typography.styles,
    );
}

function TypographySampleCard(props: {
    sample: (typeof hierarchySamples)[number];
}) {
    const { sample } = props;
    const theme = useTheme();
    const style = getStyleFromPath(theme, sample.stylePath);

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(5),
                display: "grid",
                gap: theme.spacing(2),
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
            <Typography variant="overline" color="text.secondary">
                {sample.name}
            </Typography>
            <Box
                sx={{
                    ...theme.onyxia.typography.toCssProperties(style),
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-primary"
                    ],
                }}
            >
                {sample.sample}
            </Box>
            <Typography variant="body2" color="text.secondary">
                {sample.contentRole}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {`${style.fontFamily} / ${style.fontWeight} / ${style.fontSize}px / ${style.lineHeight}px / letter spacing not defined`}
            </Typography>
        </Paper>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Typography"
            title="Typography"
            summary="The Typography foundation provides a semantic reading hierarchy that remains stable across brands, while typeface roles resolve the visual identity of each Onyxia context."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="Typography is not only about size. It is a shared language for information hierarchy, reading rhythm, emphasis, and technical content."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Typeface roles",
                            value: "Brand-aware families such as the primary interface typeface and the secondary monospace typeface.",
                        },
                        {
                            label: "Semantic styles",
                            value: "Display, heading, body, label, caption, and code styles remain stable across brands.",
                        },
                        {
                            label: "Responsive resolution",
                            value: `The current approved typography mode is ${theme.onyxia.typography.responsive.activeMode}.`,
                        },
                        {
                            label: "Theme API",
                            value: "Components consume theme.onyxia.typography rather than declaring local font rules.",
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
                        title="How to choose a typography style"
                        items={[
                            "Choose a style by information role before visual appearance.",
                            "Preserve structural heading hierarchy with heading styles.",
                            "Use label to mark or emphasize content inside an existing section.",
                            "Avoid local font-size, line-height, or weight overrides when a semantic style already exists.",
                        ]}
                    />
                    <GuidanceList
                        title="How branding and responsiveness behave"
                        items={[
                            "Branding changes typeface resolution without changing the semantic hierarchy.",
                            "Responsive typography should preserve the same semantic style names across breakpoints.",
                            "Components should not resolve typography modes locally.",
                            "MUI variants are only a compatibility subset of the full Onyxia typography API.",
                        ]}
                    />
                </Box>
            </FoundationSection>

            <FoundationSection
                title="Information hierarchy examples"
                description="These examples show how display, heading, label, body, and code roles work together without confusing visual appearance with document semantics."
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
                    <Paper variant="outlined" sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <Typography component="h2" variant="h4">
                                Page heading and grouped content
                            </Typography>
                            <Box
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.label.md
                                        .semibold,
                                )}
                            >
                                Data access
                            </Box>
                            <Box
                                component="p"
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.body.md,
                                )}
                            >
                                Label marks the start of a reading block without
                                becoming a structural heading.
                            </Box>
                            <Box
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.label.md
                                        .default,
                                )}
                            >
                                Environment
                            </Box>
                            <Box
                                component="p"
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.body.md,
                                )}
                            >
                                Body copy remains the main reading experience.
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                        <Stack spacing={2}>
                            <Typography component="h2" variant="h4">
                                Technical and supporting content
                            </Typography>
                            <Box
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.label.sm,
                                )}
                            >
                                Connection snippet
                            </Box>
                            <Box
                                component="pre"
                                sx={{
                                    m: 0,
                                    p: 2,
                                    borderRadius:
                                        theme.onyxia.radius.toCssValue(
                                            "radius-2",
                                        ),
                                    overflowX: "auto",
                                    backgroundColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/surface/surface-secondary"
                                        ],
                                    ...theme.onyxia.typography.toCssProperties(
                                        theme.onyxia.typography.styles.code.md,
                                    ),
                                }}
                            >
                                kubectl port-forward svc/onyxia 8080:80
                            </Box>
                            <Box
                                component="p"
                                sx={theme.onyxia.typography.toCssProperties(
                                    theme.onyxia.typography.styles.caption.md,
                                )}
                            >
                                Caption supports supporting detail without
                                inventing a custom smaller scale.
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function TypefacesPage() {
    const theme = useTheme();
    const currentPrimary = theme.onyxia.typography.typefaces.primary;
    const currentSecondary = theme.onyxia.typography.typefaces.secondary;

    return (
        <FoundationPage
            foundation="Typography"
            title="Typeface consultation"
            summary="Typeface roles are branding-dependent. The semantic hierarchy stays stable while the resolved font families change by brand."
        >
            <FoundationSection
                title="Current brand typeface roles"
                description="The active brand determines which families resolve to the primary and secondary typeface roles."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Primary typeface",
                            value: currentPrimary,
                        },
                        {
                            label: "Secondary typeface",
                            value: currentSecondary,
                        },
                    ]}
                />
                {currentPrimary === "Marianne" && (
                    <Alert severity="warning">
                        Current approved semantic styles use weight 600, but the
                        shipped Marianne webfont set currently provides 400,
                        500, and 700. Semibold Marianne specimens therefore
                        reveal a synthetic-weight risk.
                    </Alert>
                )}
            </FoundationSection>

            <FoundationSection
                title="Brand comparison"
                description="Each specimen renders with the actual resolved family from the generated typography registry."
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
                    {onyxiaBrandModes.map(brandMode => {
                        const primary =
                            typographyTypefacesByBrand[brandMode].primary;
                        const secondary =
                            typographyTypefacesByBrand[brandMode].secondary;

                        return (
                            <Paper
                                key={brandMode}
                                variant="outlined"
                                sx={{ p: 3 }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6">
                                        {brandMode}
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="overline"
                                            color="text.secondary"
                                        >
                                            Primary
                                        </Typography>
                                        <Box
                                            sx={{
                                                fontFamily: primary,
                                                fontWeight: 700,
                                                fontSize: "32px",
                                                lineHeight: "40px",
                                            }}
                                        >
                                            Public services, with clarity.
                                        </Box>
                                    </Stack>
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="overline"
                                            color="text.secondary"
                                        >
                                            Secondary
                                        </Typography>
                                        <Box
                                            sx={{
                                                fontFamily: secondary,
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                            }}
                                        >
                                            const theme = createOnyxiaTheme(...)
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Paper>
                        );
                    })}
                </Box>
            </FoundationSection>

            <FoundationSection
                title="Weights actually used by the Design System"
                description="These specimens use the current resolved font families and the weights required by the approved semantic typography styles."
            >
                <Stack spacing={3}>
                    {[currentPrimary, currentSecondary].map(typeface => {
                        const shippedWeights =
                            shippedTypefaceWeights[typeface] ?? [];
                        const requiredWeights =
                            typeface === currentPrimary
                                ? requiredWeightsByRole.primary
                                : requiredWeightsByRole.secondary;

                        return (
                            <FoundationSubsection
                                key={typeface}
                                title={typeface}
                                description="Shipped weights come from the library font assets. Required weights come from the approved semantic typography styles."
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
                                    {requiredWeights.map(weight => {
                                        const shipped =
                                            shippedWeights.includes(weight);

                                        return (
                                            <Paper
                                                key={weight}
                                                variant="outlined"
                                                sx={{ p: theme.spacing(5) }}
                                            >
                                                <Stack spacing={1}>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        useFlexGap
                                                        flexWrap="wrap"
                                                    >
                                                        <Typography variant="subtitle2">
                                                            Weight {weight}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {shipped
                                                                ? "Shipped asset"
                                                                : "Synthetic risk"}
                                                        </Typography>
                                                    </Stack>
                                                    <Box
                                                        sx={{
                                                            fontFamily:
                                                                typeface,
                                                            fontWeight: weight,
                                                            fontSize: "28px",
                                                            lineHeight: "36px",
                                                        }}
                                                    >
                                                        The quick brown fox
                                                        jumps over the lazy dog.
                                                    </Box>
                                                </Stack>
                                            </Paper>
                                        );
                                    })}
                                </Box>
                            </FoundationSubsection>
                        );
                    })}
                </Stack>
            </FoundationSection>
        </FoundationPage>
    );
}

function SemanticHierarchyPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Typography"
            title="Semantic hierarchy"
            summary="The semantic hierarchy is the canonical typography API for components. It expresses content roles rather than ad hoc visual styling."
        >
            <FoundationSection
                title="Approved semantic styles"
                description="Every specimen below consumes the actual resolved semantic style from the active Onyxia theme."
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
                    {hierarchySamples.map(sample => (
                        <TypographySampleCard
                            key={sample.name}
                            sample={sample}
                        />
                    ))}
                </Box>
            </FoundationSection>

            <FoundationSection
                title="Content role guidance"
                description="Display, heading, label, body, caption, and code serve different reading roles. Label is not merely a form label and not automatically a lower-level HTML heading."
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
                    <GuidanceList
                        title="How to preserve hierarchy"
                        items={[
                            "Use heading styles for document structure and keep HTML heading semantics explicit.",
                            "Use label to highlight content within an existing section without creating a new structural heading.",
                            "Keep body styles for the main reading experience.",
                            "Use code only for technical or monospace content.",
                        ]}
                    />
                    <GuidanceList
                        title="What to avoid"
                        items={[
                            "Do not choose a style only because its size looks convenient.",
                            "Do not treat label as a generic replacement for heading semantics.",
                            "Do not introduce local font overrides for already-approved roles.",
                            "Do not flatten the full hierarchy into MUI variant names.",
                        ]}
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ResponsiveTypographyPage() {
    const theme = useTheme();
    const viewportWidth = useViewportWidth();

    return (
        <FoundationPage
            foundation="Typography"
            title="Responsive typography"
            summary="Responsive resolution belongs to the Typography foundation and the theme. Components should keep consuming the same semantic style names while the theme resolves the active mode."
        >
            <FoundationSection
                title="Current responsive state"
                description="Use Storybook viewport controls or resize the canvas to inspect the active responsive context."
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
                            label: "Active typography mode",
                            value: theme.onyxia.typography.responsive
                                .activeMode,
                        },
                        {
                            label: "Figma responsive modes",
                            value: "The current approved typography collection exposes a single mode: default.",
                        },
                        {
                            label: "Breakpoint mapping",
                            value: `xs < ${breakpointsValues.sm}, sm < ${breakpointsValues.md}, md < ${breakpointsValues.lg}, lg < ${breakpointsValues.xl}, xl ≥ ${breakpointsValues.xl}`,
                        },
                    ]}
                />
                <Alert severity="info">
                    The architecture is ready for multiple responsive modes, but
                    the current approved Figma typography collection still
                    resolves a single mode across breakpoints.
                </Alert>
            </FoundationSection>

            <FoundationSection
                title="Mode resolution map"
                description="The same semantic style name should survive future responsive expansion. Only the resolved mode should change."
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
                            <Box component="th">Resolved typography mode</Box>
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
                                    {
                                        typographyModeByBreakpoint[
                                            breakpoint as keyof typeof typographyModeByBreakpoint
                                        ]
                                    }
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function MuiMappingPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Typography"
            title="MUI mapping"
            summary="MUI receives a focused compatibility mapping. The full Onyxia Typography foundation remains larger and more semantic than the subset that can be expressed through MUI variants."
        >
            <FoundationSection
                title="Mapped variants"
                description="These mappings are compatibility contracts, not the source of truth for the design system."
            >
                <Box
                    component="table"
                    sx={{
                        width: "100%",
                        borderCollapse: "collapse",
                        "& th, & td": {
                            textAlign: "left",
                            borderBottom: "1px solid",
                            borderColor: theme =>
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
                            <Box component="th">MUI variant</Box>
                            <Box component="th">Onyxia semantic style</Box>
                        </Box>
                    </Box>
                    <Box component="tbody">
                        {muiMappings.map(row => (
                            <Box component="tr" key={row.muiVariant}>
                                <Box component="td">{row.muiVariant}</Box>
                                <Box component="td">{row.onyxiaStyle}</Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </FoundationSection>

            <FoundationSection
                title="Primitive component validation"
                description="These MUI primitives render through the real Onyxia theme and the compatibility overrides, not through duplicated local styles."
            >
                <Paper variant="outlined" sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <Stack spacing={3}>
                            <Typography variant="h1">
                                h1 maps to heading/xl
                            </Typography>
                            <Typography variant="h2">
                                h2 maps to heading/lg
                            </Typography>
                            <Typography variant="h3">
                                h3 maps to heading/md
                            </Typography>
                            <Typography variant="h4">
                                h4 maps to heading/sm
                            </Typography>
                            <Typography variant="h5">
                                h5 maps to label/lg
                            </Typography>
                            <Typography variant="h6">
                                h6 maps to label/md/default
                            </Typography>
                            <Typography variant="body1">
                                body1 maps to body/md for general interface
                                copy.
                            </Typography>
                            <Typography variant="body2">
                                body2 maps to body/sm for denser layouts.
                            </Typography>
                            <Typography variant="button">
                                button maps to label/md/default
                            </Typography>
                            <Typography variant="caption">
                                caption maps to caption/md
                            </Typography>
                        </Stack>
                        <Divider />
                        <Stack
                            direction="row"
                            spacing={2}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            <Button variant="contained" color="primary">
                                Primary action
                            </Button>
                            <Button variant="contained" color="secondary">
                                Secondary action
                            </Button>
                            <Button variant="contained" color="error">
                                Destructive action
                            </Button>
                        </Stack>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                        >
                            <TextField
                                label="Default field"
                                helperText="Helper text uses the semantic caption style."
                                placeholder="Body text mapping"
                                fullWidth
                            />
                            <TextField
                                label="Disabled field"
                                helperText="Disabled state"
                                defaultValue="Read-only"
                                disabled
                                fullWidth
                            />
                        </Stack>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                        >
                            <Alert severity="info" sx={{ flex: 1 }}>
                                Informational status message
                            </Alert>
                            <Alert severity="success" sx={{ flex: 1 }}>
                                Successful status message
                            </Alert>
                        </Stack>
                    </Stack>
                </Paper>
            </FoundationSection>
        </FoundationPage>
    );
}

export function TypographyDocumentationPage(
    props: TypographyDocumentationPageProps,
) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "typefaces":
            return <TypefacesPage />;
        case "semantic-hierarchy":
            return <SemanticHierarchyPage />;
        case "responsive-typography":
            return <ResponsiveTypographyPage />;
        case "mui-mapping":
            return <MuiMappingPage />;
        default:
            return null;
    }
}

function getRequiredWeightsByRole() {
    const weights = {
        primary: new Set<number>(),
        secondary: new Set<number>(),
    };

    const walk = (node: any) => {
        if (node === null || typeof node !== "object" || Array.isArray(node)) {
            return;
        }

        if (
            "typeface" in node &&
            "fontWeight" in node &&
            typeof node.fontWeight === "number"
        ) {
            if (node.typeface === "primary") {
                weights.primary.add(node.fontWeight);
            }
            if (node.typeface === "secondary") {
                weights.secondary.add(node.fontWeight);
            }

            return;
        }

        Object.values(node).forEach(walk);
    };

    walk(currentTypographyTree);

    return {
        primary: [...weights.primary].sort((a, b) => a - b),
        secondary: [...weights.secondary].sort((a, b) => a - b),
    };
}
