import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Divider,
    Paper,
    Stack,
    SvgIcon,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    onyxiaBrandModes,
    type OnyxiaBrandMode,
    type PrimitiveColorTokenName,
    type SemanticColorTokenName,
} from "../../src";
import {
    primitiveColorTokens,
    semanticColorTokens,
} from "../../src/tokens/generated/colors";
import {
    getContrastInterpretation,
    getContrastRatio,
} from "../../src/tools/color/colorUtils";
import {
    FoundationPage,
    FoundationSection,
    FoundationSubsection,
    GuidanceList,
    KeyValueList,
} from "./FoundationDocs";

type ColorsDocumentationPageKey =
    | "overview"
    | "palettes"
    | "semantic-use-cases"
    | "interaction-states"
    | "accessibility";

type ColorsDocumentationPageProps = {
    page: ColorsDocumentationPageKey;
};

const paletteFamilies = Object.entries(
    Object.keys(primitiveColorTokens).reduce<
        Record<string, PrimitiveColorTokenName[]>
    >((acc, tokenName) => {
        const parts = tokenName.split("/");
        const path = parts.slice(0, 3).join("/");
        acc[path] ??= [];
        acc[path].push(tokenName as PrimitiveColorTokenName);

        return acc;
    }, {}),
)
    .map(([path, tokens]) => ({
        path,
        tokens: tokens.sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true }),
        ),
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

const semanticGroups = Object.entries(
    Object.keys(semanticColorTokens).reduce<
        Record<string, SemanticColorTokenName[]>
    >((acc, tokenName) => {
        const [, group] = tokenName.split("/");
        acc[group] ??= [];
        acc[group].push(tokenName as SemanticColorTokenName);

        return acc;
    }, {}),
)
    .map(([group, tokens]) => ({
        group,
        tokens: tokens.sort(),
    }))
    .sort((a, b) => a.group.localeCompare(b.group));

const semanticGroupDescriptions: Record<string, string> = {
    backgrounds:
        "Background tokens define the base reading environment of the application.",
    borders:
        "Border tokens express separation, focus, validation, and structural boundaries.",
    contents:
        "Content tokens drive readable text, icons, labels, and status foregrounds.",
    overlay:
        "Overlay tokens tint the interface when a layer sits above the main surface.",
    shadow: "Shadow tokens provide semantic elevation colors instead of ad hoc alpha values.",
    surface:
        "Surface tokens represent panels, states, actions, and functional containers.",
};

const contrastChecks = [
    {
        label: "Primary text on page background",
        foreground: "usecases/contents/content-primary",
        background: "usecases/backgrounds/background",
        kind: "Normal text",
    },
    {
        label: "Secondary text on primary surface",
        foreground: "usecases/contents/content-secondary",
        background: "usecases/surface/surface-primary",
        kind: "Normal text",
    },
    {
        label: "Inverse text on primary action surface",
        foreground: "usecases/contents/content-inverse",
        background: "usecases/surface/surface-action-primary",
        kind: "Normal text",
    },
    {
        label: "Danger content on contrast danger surface",
        foreground: "usecases/contents/content-danger",
        background: "usecases/surface/surface-contrast-danger",
        kind: "Normal text",
    },
    {
        label: "Disabled content on tertiary surface",
        foreground: "usecases/contents/content-disabled",
        background: "usecases/surface/surface-tertiary",
        kind: "Normal text",
    },
    {
        label: "Focus border on primary surface",
        foreground: "usecases/borders/border-focus",
        background: "usecases/surface/surface-primary",
        kind: "Non-text UI",
    },
];

const borderTokens = [
    {
        label: "Neutral",
        tokenName: "usecases/borders/border-neutral-primary",
    },
    {
        label: "Focus",
        tokenName: "usecases/borders/border-focus",
    },
    {
        label: "Success",
        tokenName: "usecases/borders/border-success",
    },
    {
        label: "Warning",
        tokenName: "usecases/borders/border-warning",
    },
    {
        label: "Danger",
        tokenName: "usecases/borders/border-danger",
    },
    {
        label: "Info",
        tokenName: "usecases/borders/border-info",
    },
] as const satisfies ReadonlyArray<{
    label: string;
    tokenName: SemanticColorTokenName;
}>;

function useSemanticColor(tokenName: SemanticColorTokenName) {
    return useTheme().onyxia.semantic.values[tokenName];
}

function getReadableTokenName(tokenName: string) {
    return tokenName.split("/").at(-1) ?? tokenName;
}

function SurfacePanel(props: {
    title: string;
    subtitle: string;
    surfaceToken: SemanticColorTokenName;
    contentToken: SemanticColorTokenName;
    borderToken?: SemanticColorTokenName;
    iconToken?: SemanticColorTokenName;
}) {
    const theme = useTheme();
    const {
        title,
        subtitle,
        surfaceToken,
        contentToken,
        borderToken = "usecases/borders/border-neutral-primary",
        iconToken = contentToken,
    } = props;
    const surfaceColor = useSemanticColor(surfaceToken);
    const contentColor = useSemanticColor(contentToken);
    const borderColor = useSemanticColor(borderToken);

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(5),
                height: "100%",
                backgroundColor: surfaceColor,
                borderColor,
                color: contentColor,
            }}
        >
            <Stack spacing={3}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <StatusIcon tokenName={iconToken} />
                    <Typography variant="subtitle1">{title}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: contentColor }}>
                    {subtitle}
                </Typography>
            </Stack>
        </Paper>
    );
}

function StatusIcon(props: { tokenName: SemanticColorTokenName }) {
    const { tokenName } = props;
    const color = useSemanticColor(tokenName);

    return (
        <SvgIcon sx={{ color }}>
            <path d="M12 2 3 6.5v6.2c0 4.7 3.2 8.9 9 9.3 5.8-.4 9-4.6 9-9.3V6.5L12 2Zm0 3.1 5.5 2.7v4.8c0 3.2-2 6.2-5.5 6.7-3.5-.5-5.5-3.5-5.5-6.7V7.8L12 5.1Z" />
        </SvgIcon>
    );
}

function TokenMeta(props: {
    tokenName: string;
    alias?: string;
    value: string;
}) {
    const { tokenName, alias, value } = props;
    const theme = useTheme();

    return (
        <Stack spacing={1}>
            <Typography variant="overline" color="text.secondary">
                {tokenName}
            </Typography>
            {alias !== undefined && (
                <Typography
                    variant="caption"
                    sx={{
                        color: theme.onyxia.semantic.values[
                            "usecases/contents/content-secondary"
                        ],
                    }}
                >
                    Alias: {alias}
                </Typography>
            )}
            <Typography
                variant="caption"
                sx={{
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-secondary"
                    ],
                }}
            >
                Resolved: {value}
            </Typography>
        </Stack>
    );
}

function PaletteSwatch(props: {
    tokenName: PrimitiveColorTokenName;
    brandMode: OnyxiaBrandMode;
    showBrand?: boolean;
}) {
    const { tokenName, brandMode, showBrand = false } = props;
    const value = primitiveColorTokens[tokenName][brandMode];
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                overflow: "hidden",
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
            }}
        >
            <Box sx={{ height: 72, backgroundColor: value }} />
            <Stack spacing={1} sx={{ p: theme.spacing(3) }}>
                <Typography variant="body2">
                    {getReadableTokenName(tokenName)}
                </Typography>
                {showBrand && (
                    <Typography variant="caption" color="text.secondary">
                        {brandMode}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                    {value}
                </Typography>
            </Stack>
        </Paper>
    );
}

function SemanticTokenCard(props: { tokenName: SemanticColorTokenName }) {
    const { tokenName } = props;
    const theme = useTheme();
    const alias = theme.onyxia.getSemanticAlias(tokenName);
    const value = theme.onyxia.getSemanticColor(tokenName);
    const group = tokenName.split("/")[1];

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
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
            <TokenMeta tokenName={tokenName} alias={alias} value={value} />
            <SemanticPreview tokenName={tokenName} group={group} />
        </Paper>
    );
}

function SemanticPreview(props: {
    tokenName: SemanticColorTokenName;
    group: string;
}) {
    const { tokenName, group } = props;
    const theme = useTheme();
    const value = theme.onyxia.getSemanticColor(tokenName);

    if (group === "contents") {
        return (
            <Paper
                variant="outlined"
                sx={{
                    p: theme.spacing(3),
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
                <Stack direction="row" spacing={2} alignItems="center">
                    <StatusIcon tokenName={tokenName} />
                    <Typography sx={{ color: value }}>
                        Example content
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    if (group === "borders") {
        return (
            <Box
                sx={{
                    minHeight: 80,
                    border: `2px solid ${value}`,
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Typography variant="body2">Border specimen</Typography>
            </Box>
        );
    }

    if (group === "shadow") {
        return (
            <Box
                sx={{
                    minHeight: 80,
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    boxShadow: `0px 12px 28px 0px ${value}`,
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Typography variant="body2">Shadow specimen</Typography>
            </Box>
        );
    }

    if (group === "overlay") {
        return (
            <Box
                sx={{
                    position: "relative",
                    minHeight: 100,
                    overflow: "hidden",
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    border: 1,
                    borderColor:
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: value,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        left: theme.spacing(4),
                        right: theme.spacing(4),
                        bottom: theme.spacing(4),
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-2"),
                        px: theme.spacing(3),
                        py: 1,
                        backgroundColor:
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-secondary"
                            ],
                    }}
                >
                    <Typography variant="body2">Overlay specimen</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: 88,
                borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                border: 1,
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
                backgroundColor: value,
                display: "grid",
                placeItems: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-primary"
                    ],
                }}
            >
                Semantic specimen
            </Typography>
        </Box>
    );
}

function ButtonShowcase() {
    const theme = useTheme();
    const buttonStates: ReadonlyArray<{
        label: string;
        simulatedState?: "hover" | "pressed" | "focus";
        disabled?: boolean;
    }> = [
        { label: "Default" },
        { label: "Hover", simulatedState: "hover" },
        { label: "Pressed", simulatedState: "pressed" },
        { label: "Focus", simulatedState: "focus" },
        { label: "Disabled", disabled: true },
    ];

    const buttonRows = [
        {
            label: "Primary",
            color: "primary",
            defaultToken: "usecases/surface/surface-action-primary",
        },
        {
            label: "Secondary",
            color: "secondary",
            defaultToken: "usecases/surface/surface-action-secondary",
        },
        {
            label: "Destructive",
            color: "error",
            defaultToken: "usecases/surface/surface-action-danger",
        },
    ] as const;

    return (
        <Box
            sx={{
                display: "grid",
                gap: theme.spacing(3),
                gridTemplateColumns: {
                    xs: "minmax(0, 1fr)",
                    xl: "repeat(3, minmax(0, 1fr))",
                },
            }}
        >
            {buttonRows.map(({ label, color, defaultToken }) => (
                <Paper key={label} variant="outlined" sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        <Typography variant="subtitle2">{label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            Default semantic surface: {defaultToken}
                        </Typography>
                        {buttonStates.map(
                            ({
                                label: stateLabel,
                                simulatedState,
                                disabled,
                            }) => (
                                <Stack
                                    key={stateLabel}
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Box sx={{ minWidth: 72 }}>
                                        <Typography variant="caption">
                                            {stateLabel}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color={color}
                                        disabled={disabled}
                                        data-simulated-state={simulatedState}
                                    >
                                        {label}
                                    </Button>
                                </Stack>
                            ),
                        )}
                    </Stack>
                </Paper>
            ))}
        </Box>
    );
}

function TextFieldShowcase() {
    const theme = useTheme();

    return (
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
            <TextField
                fullWidth
                variant="outlined"
                label="Default"
                defaultValue="Ready for input"
                helperText="Uses semantic surface and border tokens."
            />
            <TextField
                fullWidth
                focused
                variant="outlined"
                label="Focused"
                defaultValue="Focus indicator"
                helperText="Focus ring and border come from semantic tokens."
            />
            <TextField
                fullWidth
                disabled
                variant="outlined"
                label="Disabled"
                defaultValue="Unavailable"
                helperText="Disabled surface and content stay semantic."
            />
            <TextField
                fullWidth
                error
                variant="outlined"
                label="Error"
                defaultValue="Validation issue"
                helperText="Error borders map to semantic danger tokens."
            />
        </Box>
    );
}

function AccessibilityTable() {
    const theme = useTheme();

    return (
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
                    verticalAlign: "top",
                },
                "& th": {
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-secondary"
                    ],
                },
            }}
        >
            <Box component="thead">
                <Box component="tr">
                    <Box component="th">Combination</Box>
                    <Box component="th">Specimen</Box>
                    <Box component="th">Contrast</Box>
                    <Box component="th">Interpretation</Box>
                </Box>
            </Box>
            <Box component="tbody">
                {contrastChecks.map(row => {
                    const foreground = theme.onyxia.getSemanticColor(
                        row.foreground as SemanticColorTokenName,
                    );
                    const background = theme.onyxia.getSemanticColor(
                        row.background as SemanticColorTokenName,
                    );
                    const ratio = getContrastRatio(foreground, background);

                    return (
                        <Box component="tr" key={row.label}>
                            <Box component="td">
                                <Stack spacing={1}>
                                    <Typography variant="body2">
                                        {row.label}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {row.foreground} on {row.background}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box component="td">
                                <Box
                                    sx={{
                                        borderRadius:
                                            theme.onyxia.radius.toCssValue(
                                                "radius-2",
                                            ),
                                        px: theme.spacing(3),
                                        py: 1,
                                        backgroundColor: background,
                                        color: foreground,
                                        border: "1px solid",
                                        borderColor:
                                            theme.onyxia.semantic.values[
                                                "usecases/borders/border-neutral-primary"
                                            ],
                                    }}
                                >
                                    Specimen
                                </Box>
                            </Box>
                            <Box component="td">
                                <Stack spacing={1}>
                                    <Typography variant="body2">
                                        {ratio.toFixed(2)}:1
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {foreground} / {background}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box component="td">
                                <Stack spacing={1}>
                                    <Typography variant="body2">
                                        {row.kind}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {getContrastInterpretation(ratio)}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Colors"
            title="Colors"
            summary="The Colors foundation separates primitive palettes from semantic use cases so branding and light or dark mode can change visual resolution without changing component intent."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="The semantic layer preserves meaning. Components ask for a role such as primary content, hover surface, or focus border instead of selecting a brand shade directly."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Primitive palettes",
                            value: "Brand, neutral, and functional color ramps.",
                        },
                        {
                            label: "Semantic use cases",
                            value: "Backgrounds, surfaces, contents, borders, overlays, and shadows.",
                        },
                        {
                            label: "Branding",
                            value: `${theme.onyxia.brandMode} currently resolves the active primitive palette values.`,
                        },
                        {
                            label: "Theme API",
                            value: "Components consume semantic tokens from theme.onyxia rather than raw palette values.",
                        },
                    ]}
                />
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            md: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    <SurfacePanel
                        title="Page background"
                        subtitle="The reading environment resolves from a background semantic token."
                        surfaceToken="usecases/backgrounds/background"
                        contentToken="usecases/contents/content-primary"
                    />
                    <SurfacePanel
                        title="Primary surface"
                        subtitle="Panels consume semantic surfaces so the same component works across palettes and modes."
                        surfaceToken="usecases/surface/surface-primary"
                        contentToken="usecases/contents/content-primary"
                    />
                    <SurfacePanel
                        title="Action surface"
                        subtitle="Action states have dedicated semantic tokens instead of locally darkened colors."
                        surfaceToken="usecases/surface/surface-action-primary"
                        contentToken="usecases/contents/content-inverse"
                        borderToken="usecases/surface/surface-action-primary"
                    />
                </Box>
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
                        title="How to choose colors"
                        items={[
                            "Choose a semantic use case before choosing a visual color.",
                            "Use palette primitives for foundation work, not for component implementation.",
                            "Prefer dedicated state tokens for hover, pressed, focus, selected, and disabled states.",
                            "Validate foreground and background combinations in context.",
                        ]}
                    />
                    <GuidanceList
                        title="How to validate the implementation"
                        items={[
                            "Switch branding with the global toolbar to confirm semantic stability.",
                            "Switch light and dark mode to verify alias resolution.",
                            "Use the semantic and interaction pages to compare states side by side.",
                            "Use the accessibility page to inspect representative contrast combinations.",
                        ]}
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function PalettesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Colors"
            title="Palette consultation"
            summary="Palette families are the primitive layer of the color foundation. They remain useful for design-system authors and visual audits, but components should generally consume semantic tokens instead."
        >
            <FoundationSection
                title="Current brand palette families"
                description="The active Storybook branding resolves the primitive palette values shown here. Primitive ramps do not switch between light and dark mode directly; semantic aliases do."
            >
                <Alert severity="info">
                    Primitive palettes are foundation materials. The semantic
                    layer is the normal component API.
                </Alert>
                <Stack spacing={3}>
                    {paletteFamilies.map(family => (
                        <FoundationSubsection
                            key={family.path}
                            title={family.path.replace("colors-palette/", "")}
                            description="Each specimen shows the resolved primitive value for the active brand."
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    gap: theme.spacing(2),
                                    gridTemplateColumns: {
                                        xs: "repeat(2, minmax(0, 1fr))",
                                        md: "repeat(4, minmax(0, 1fr))",
                                        xl: "repeat(6, minmax(0, 1fr))",
                                    },
                                }}
                            >
                                {family.tokens.map(tokenName => (
                                    <PaletteSwatch
                                        key={tokenName}
                                        tokenName={tokenName}
                                        brandMode={theme.onyxia.brandMode}
                                    />
                                ))}
                            </Box>
                        </FoundationSubsection>
                    ))}
                </Stack>
            </FoundationSection>

            <FoundationSection
                title="Brand comparison"
                description="These comparison strips make branding differences explicit without changing the semantic naming. The same component API can resolve to a different primitive palette in each brand mode."
            >
                {[
                    "colors-palette/accent/primary/primary-500",
                    "colors-palette/accent/secondary/secondary-500",
                    "colors-palette/neutral/neutral-950",
                    "colors-palette/alert/success/success-500",
                ].map(tokenName => (
                    <FoundationSubsection
                        key={tokenName}
                        title={tokenName}
                        description="Resolved primitive value by branding mode."
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gap: theme.spacing(2),
                                gridTemplateColumns: {
                                    xs: "repeat(2, minmax(0, 1fr))",
                                    md: "repeat(5, minmax(0, 1fr))",
                                },
                            }}
                        >
                            {onyxiaBrandModes.map(brandMode => (
                                <PaletteSwatch
                                    key={brandMode}
                                    tokenName={
                                        tokenName as PrimitiveColorTokenName
                                    }
                                    brandMode={brandMode}
                                    showBrand
                                />
                            ))}
                        </Box>
                    </FoundationSubsection>
                ))}
            </FoundationSection>
        </FoundationPage>
    );
}

function SemanticUseCasesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Colors"
            title="Semantic use cases"
            summary="Semantic color tokens are organized by design intent: what the color is for, not what shade it happens to be today. This is the layer components should consume."
        >
            <FoundationSection
                title="Use semantic roles instead of palette values"
                description="Each group below represents a design role from the approved use-case hierarchy. Switch branding and mode globally to verify that semantic names stay stable while resolved values change."
            >
                <Stack spacing={3}>
                    {semanticGroups.map(({ group, tokens }) => (
                        <FoundationSubsection
                            key={group}
                            title={group}
                            description={
                                semanticGroupDescriptions[group] ??
                                "Semantic roles in this group should be selected by purpose."
                            }
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
                                {tokens.map(tokenName => (
                                    <SemanticTokenCard
                                        key={tokenName}
                                        tokenName={tokenName}
                                    />
                                ))}
                            </Box>
                        </FoundationSubsection>
                    ))}
                </Stack>
            </FoundationSection>
        </FoundationPage>
    );
}

function InteractionStatesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Colors"
            title="Interaction states"
            summary="Interactive states should resolve through dedicated semantic tokens instead of local color derivation. This page shows how the real theme maps default, hover, pressed, focus, disabled, and status states."
        >
            <FoundationSection
                title="Buttons and action states"
                description="Contained buttons demonstrate the semantic action surfaces used by the MUI compatibility layer. Hover, pressed, and focus states are shown through the same runtime styles as components."
            >
                <ButtonShowcase />
            </FoundationSection>

            <FoundationSection
                title="Inputs, borders, and validation"
                description="Text fields show default, focused, disabled, and error states through the actual MUI theme mapping."
            >
                <TextFieldShowcase />
                <Divider />
                <FoundationSubsection
                    title="Border semantics"
                    description="Focus, neutral, and status borders remain dedicated semantic roles."
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
                        {borderTokens.map(({ label, tokenName }) => (
                            <Paper
                                key={tokenName}
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    borderColor:
                                        theme.onyxia.semantic.values[tokenName],
                                    backgroundColor: theme =>
                                        theme.onyxia.semantic.values[
                                            "usecases/surface/surface-primary"
                                        ],
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <StatusIcon tokenName={tokenName} />
                                    <Stack spacing={1}>
                                        <Typography variant="body2">
                                            {label}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {tokenName}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Box>
                </FoundationSubsection>
            </FoundationSection>

            <FoundationSection
                title="Status surfaces, overlays, and feedback"
                description="Functional surfaces, alerts, and overlays also consume semantic state tokens. This helps designers and developers compare status behavior without inspecting code."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            md: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    <SurfacePanel
                        title="Selected"
                        subtitle="Selection feedback stays semantic across every palette."
                        surfaceToken="usecases/surface/surface-selected"
                        contentToken="usecases/contents/content-primary"
                        borderToken="usecases/borders/border-focus-low"
                        iconToken="usecases/contents/content-focus"
                    />
                    <SurfacePanel
                        title="Hover"
                        subtitle="Hover uses a dedicated semantic surface rather than local alpha math."
                        surfaceToken="usecases/surface/surface-hover"
                        contentToken="usecases/contents/content-primary"
                        borderToken="usecases/borders/border-secondary"
                    />
                    <SurfacePanel
                        title="Disabled"
                        subtitle="Disabled surfaces pair muted background and muted content."
                        surfaceToken="usecases/surface/surface-tertiary"
                        contentToken="usecases/contents/content-disabled"
                        borderToken="usecases/borders/border-secondary"
                        iconToken="usecases/contents/content-disabled"
                    />
                </Box>
                <Stack spacing={3}>
                    <Typography component="h3" variant="h5">
                        Status messages
                    </Typography>
                    <Stack spacing={3}>
                        <Alert severity="success">Success feedback</Alert>
                        <Alert severity="warning">Warning feedback</Alert>
                        <Alert severity="error">Danger feedback</Alert>
                        <Alert severity="info">Information feedback</Alert>
                    </Stack>
                </Stack>
            </FoundationSection>
        </FoundationPage>
    );
}

function AccessibilityPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Colors"
            title="Accessibility and testing"
            summary="Contrast ratios help evaluate representative semantic foreground and background combinations, but they do not replace full accessibility review. Use this page to inspect readable pairings in the active brand and mode."
        >
            <FoundationSection
                title="Representative semantic combinations"
                description="The table below uses resolved semantic colors from the active theme. It intentionally includes combinations that are strong, marginal, and potentially weak so that issues remain visible."
            >
                <AccessibilityTable />
            </FoundationSection>

            <FoundationSection
                title="How to use this page"
                description="Contrast metrics are only one part of accessibility review. Keyboard behavior, focus visibility, semantic HTML, and component state clarity must still be checked in context."
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
                        title="What to validate"
                        items={[
                            "Normal text generally needs at least 4.5:1 contrast.",
                            "Large text and many non-text UI elements generally need at least 3:1 contrast.",
                            "Focus indicators must remain visible through keyboard navigation.",
                            "A passing ratio does not guarantee good semantics, spacing, or comprehension.",
                        ]}
                    />
                    <GuidanceList
                        title="How to consult the examples"
                        items={[
                            "Switch branding and dark mode globally to inspect semantic stability.",
                            "Use the viewport toolbar to confirm that dense grids remain readable around 1366 × 768.",
                            "Use the interaction-state page alongside this one when evaluating focus and disabled states.",
                            "Escalate semantic pairings that are visually surprising even if the numeric ratio still passes.",
                        ]}
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

export function ColorsDocumentationPage(props: ColorsDocumentationPageProps) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "palettes":
            return <PalettesPage />;
        case "semantic-use-cases":
            return <SemanticUseCasesPage />;
        case "interaction-states":
            return <InteractionStatesPage />;
        case "accessibility":
            return <AccessibilityPage />;
        default:
            return null;
    }
}
