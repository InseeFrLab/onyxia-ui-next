import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import {
    type OnyxiaColorMode,
    type OnyxiaBrandMode,
    type PrimitiveColorTokenName,
    type SemanticColorTokenName,
} from "../../src";
import { primitiveColorTokens } from "../../src/tokens/generated/colors";
import {
    getContrastInterpretation,
    getContrastRatio,
    isHexColor,
    normalizeHexColor,
} from "../../src/tools/color/colorUtils";
import {
    formatPrimaryPaletteHexList,
    formatPrimaryPaletteJson,
    generatePrimaryAlphaPalette,
    generatePrimaryPalette,
    primaryPaletteTonalSteps,
    type GeneratedPrimaryAlphaPalette,
    type GeneratedPrimaryPalette,
} from "../../src/tools/color/generatePrimaryPalette";
import { createPrimaryPalettePreviewTheme } from "../../src/tools/color/createPrimaryPalettePreviewTheme";
import {
    FoundationPage,
    FoundationSection,
    GuidanceList,
    KeyValueList,
} from "./FoundationDocs";

const defaultBrandColor = "#FE3711";

const lightSurfaceTokenName =
    "colors-palette/neutral/neutral-50" as PrimitiveColorTokenName;
const darkSurfaceTokenName =
    "colors-palette/neutral/neutral-1000" as PrimitiveColorTokenName;

function getApprovedPrimaryPalette(brandMode: OnyxiaBrandMode) {
    return Object.fromEntries(
        primaryPaletteTonalSteps.map(step => {
            const tokenName =
                `colors-palette/accent/primary/primary-${step}` as PrimitiveColorTokenName;

            return [step, primitiveColorTokens[tokenName][brandMode]];
        }),
    ) as Record<(typeof primaryPaletteTonalSteps)[number], string>;
}

function getReadableForeground(params: {
    background: string;
    light: string;
    dark: string;
}) {
    const { background, light, dark } = params;

    return getContrastRatio(light, background) >=
        getContrastRatio(dark, background)
        ? light
        : dark;
}

function ContrastBadge(props: { ratio: number; kind: "normal" | "large" }) {
    const { ratio, kind } = props;
    const theme = useTheme();
    const passes = ratio >= (kind === "normal" ? 4.5 : 3);

    return (
        <Box
            component="span"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: theme.onyxia.radius.toCssValue("radius-full"),
                px: theme.spacing(2),
                py: theme.spacing(1),
                backgroundColor: passes
                    ? theme.onyxia.semantic.values[
                          "usecases/surface/surface-contrast-success"
                      ]
                    : theme.onyxia.semantic.values[
                          "usecases/surface/surface-contrast-warning"
                      ],
                color: passes
                    ? theme.onyxia.semantic.values[
                          "usecases/contents/content-success"
                      ]
                    : theme.onyxia.semantic.values[
                          "usecases/contents/content-warning"
                      ],
            }}
        >
            {passes ? "Pass" : "Review"}
        </Box>
    );
}

function GeneratedPaletteRow(props: {
    tokenLabel: string;
    color: string;
    highlight?: boolean;
}) {
    const { tokenLabel, color, highlight = false } = props;
    const theme = useTheme();
    const foreground = getReadableForeground({
        background: color,
        light: "#FFFFFF",
        dark: theme.onyxia.primitive[darkSurfaceTokenName],
    });

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(3),
                borderColor: highlight
                    ? theme.onyxia.semantic.values[
                          "usecases/borders/border-focus"
                      ]
                    : theme.onyxia.semantic.values[
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
                    width: "100%",
                    minHeight: theme.onyxia.sizing.toCssValue("size-10"),
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                    backgroundColor: color,
                    color: foreground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: theme.spacing(3),
                    py: theme.spacing(2),
                    boxShadow: highlight
                        ? `0 0 0 3px ${theme.onyxia.semantic.values["usecases/borders/border-focus-low"]}`
                        : "none",
                }}
            >
                <Typography variant="subtitle2">{tokenLabel}</Typography>
                <Typography variant="body2">{color}</Typography>
            </Box>
        </Paper>
    );
}

const primaryDrivenPreviewTokens = [
    "usecases/surface/surface-action-primary",
    "usecases/surface/surface-action-primary-hover",
    "usecases/surface/surface-action-primary-pressed",
    "usecases/contents/content-focus",
    "usecases/surface/surface-focus",
    "usecases/surface/surface-selected",
    "usecases/borders/border-focus",
    "usecases/borders/border-focus-low",
] as const satisfies readonly SemanticColorTokenName[];

function PreviewSemanticCard(props: {
    title: string;
    subtitle: string;
    surfaceToken: SemanticColorTokenName;
    contentToken: SemanticColorTokenName;
    borderToken?: SemanticColorTokenName;
    accentToken?: SemanticColorTokenName;
}) {
    const {
        title,
        subtitle,
        surfaceToken,
        contentToken,
        borderToken,
        accentToken,
    } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(3),
                backgroundColor: theme.onyxia.semantic.values[surfaceToken],
                borderColor:
                    borderToken === undefined
                        ? theme.onyxia.semantic.values[
                              "usecases/borders/border-neutral-primary"
                          ]
                        : theme.onyxia.semantic.values[borderToken],
                color: theme.onyxia.semantic.values[contentToken],
            }}
        >
            <Stack spacing={3}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="body2">{subtitle}</Typography>
                    </Stack>
                    {accentToken !== undefined && (
                        <Box
                            sx={{
                                width: theme.onyxia.sizing.toCssValue("size-4"),
                                height: theme.onyxia.sizing.toCssValue(
                                    "size-4",
                                ),
                                borderRadius:
                                    theme.onyxia.radius.toCssValue(
                                        "radius-full",
                                    ),
                                backgroundColor:
                                    theme.onyxia.semantic.values[accentToken],
                                flexShrink: 0,
                            }}
                        />
                    )}
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary">
                        Surface: {surfaceToken}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Content: {contentToken}
                    </Typography>
                    {borderToken !== undefined && (
                        <Typography variant="caption" color="text.secondary">
                            Border: {borderToken}
                        </Typography>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
}

function SemanticResolutionCard(props: { tokenName: SemanticColorTokenName }) {
    const { tokenName } = props;
    const theme = useTheme();
    const primitiveAlias = theme.onyxia.semantic.aliases[tokenName];
    const resolvedValue = theme.onyxia.semantic.values[tokenName];

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(2),
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
            <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                    {tokenName}
                </Typography>
                <Typography variant="body2">{primitiveAlias}</Typography>
                <Typography variant="body2">{resolvedValue}</Typography>
            </Stack>
        </Paper>
    );
}

function PreviewThemeContent(props: { title: string }) {
    const { title } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(4),
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/backgrounds/background"
                    ],
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
                color: theme.onyxia.semantic.values[
                    "usecases/contents/content-primary"
                ],
            }}
        >
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Only the primary primitive palette is replaced here. The
                        semantic aliases and the MUI mapping stay the same.
                    </Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="subtitle2">
                        Primary-driven semantic resolution
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gap: theme.spacing(2),
                            gridTemplateColumns: {
                                xs: "minmax(0, 1fr)",
                                md: "repeat(2, minmax(0, 1fr))",
                            },
                        }}
                    >
                        {primaryDrivenPreviewTokens.map(tokenName => (
                            <SemanticResolutionCard
                                key={tokenName}
                                tokenName={tokenName}
                            />
                        ))}
                    </Box>
                </Stack>
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
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">
                            Action states through the real MUI mapping
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Primary actions follow the approved semantic action
                            surfaces. Secondary actions stay on their neutral
                            semantics.
                        </Typography>
                        <Stack spacing={2}>
                            <Stack
                                direction="row"
                                spacing={2}
                                useFlexGap
                                flexWrap="wrap"
                            >
                                <Button variant="contained" color="primary">
                                    Primary default
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-simulated-state="hover"
                                >
                                    Primary hover
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-simulated-state="pressed"
                                >
                                    Primary pressed
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-simulated-state="focus"
                                >
                                    Primary focus
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled
                                >
                                    Primary disabled
                                </Button>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={2}
                                useFlexGap
                                flexWrap="wrap"
                            >
                                <Button variant="contained" color="secondary">
                                    Secondary default
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    data-simulated-state="hover"
                                >
                                    Secondary hover
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    data-simulated-state="pressed"
                                >
                                    Secondary pressed
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled
                                >
                                    Secondary disabled
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
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
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">
                                Inputs and focus treatment
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Focus and validation come from the real semantic
                                border and surface tokens, not from arbitrary
                                primary shades.
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Default field"
                                    placeholder="Semantic input surface"
                                    fullWidth
                                />
                                <TextField
                                    focused
                                    label="Focused field"
                                    defaultValue="Uses border-focus and surface-focus"
                                    fullWidth
                                />
                                <TextField
                                    disabled
                                    label="Disabled field"
                                    defaultValue="Disabled"
                                    fullWidth
                                />
                                <TextField
                                    error
                                    label="Error field"
                                    defaultValue="Validation"
                                    helperText="Status semantics remain official."
                                    fullWidth
                                />
                            </Stack>
                        </Stack>
                    </Paper>
                    <Stack spacing={3}>
                        <PreviewSemanticCard
                            title="Selected surface"
                            subtitle="This tinted state resolves from the selected semantic surface, not from a direct light primary step."
                            surfaceToken="usecases/surface/surface-selected"
                            contentToken="usecases/contents/content-primary"
                            borderToken="usecases/borders/border-focus-low"
                            accentToken="usecases/contents/content-focus"
                        />
                        <PreviewSemanticCard
                            title="Focus emphasis surface"
                            subtitle="Focus emphasis uses the semantic focus tint and focus content color."
                            surfaceToken="usecases/surface/surface-focus"
                            contentToken="usecases/contents/content-focus"
                            borderToken="usecases/borders/border-focus"
                            accentToken="usecases/contents/content-focus"
                        />
                    </Stack>
                </Box>
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
                    <Stack spacing={3}>
                        <PreviewSemanticCard
                            title="Neutral hover surface"
                            subtitle="Generic hover feedback stays on the neutral semantic surface."
                            surfaceToken="usecases/surface/surface-hover"
                            contentToken="usecases/contents/content-primary"
                            borderToken="usecases/borders/border-secondary"
                        />
                        <PreviewSemanticCard
                            title="Disabled surface"
                            subtitle="Disabled states remain muted and do not inherit the generated brand palette."
                            surfaceToken="usecases/surface/surface-tertiary"
                            contentToken="usecases/contents/content-disabled"
                            borderToken="usecases/borders/border-secondary"
                        />
                    </Stack>
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
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">
                                Overlay and status surfaces
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                These remain on their official semantic tokens.
                                Replacing the primary palette should not recolor
                                them.
                            </Typography>
                            <Box
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius:
                                        theme.onyxia.radius.toCssValue(
                                            "radius-2",
                                        ),
                                    border: "1px solid",
                                    borderColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/borders/border-neutral-primary"
                                        ],
                                    minHeight:
                                        theme.onyxia.sizing.toCssValue(
                                            "size-10",
                                        ),
                                    backgroundColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/surface/surface-secondary"
                                        ],
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        backgroundColor:
                                            theme.onyxia.semantic.values[
                                                "usecases/overlay/default"
                                            ],
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "relative",
                                        zIndex: 1,
                                        p: theme.spacing(3),
                                    }}
                                >
                                    <Typography variant="body2">
                                        Overlay semantic preview
                                    </Typography>
                                </Box>
                            </Box>
                            <Stack spacing={2}>
                                <Alert severity="success">Success status</Alert>
                                <Alert severity="info">
                                    Information status
                                </Alert>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Paper>
    );
}

function PreviewPane(props: {
    title: string;
    colorMode: OnyxiaColorMode;
    palette: GeneratedPrimaryPalette;
    alphaPalette: GeneratedPrimaryAlphaPalette;
}) {
    const { title, colorMode, palette, alphaPalette } = props;
    const theme = useTheme();
    const previewTheme = React.useMemo(
        () =>
            createPrimaryPalettePreviewTheme({
                baseTheme: theme,
                colorMode,
                palette,
                alphaPalette,
            }),
        [alphaPalette, colorMode, palette, theme],
    );

    return (
        <ThemeProvider theme={previewTheme}>
            <PreviewThemeContent title={title} />
        </ThemeProvider>
    );
}

async function copyTextToClipboard(text: string) {
    if (
        typeof navigator === "undefined" ||
        navigator.clipboard === undefined ||
        typeof navigator.clipboard.writeText !== "function"
    ) {
        throw new Error("Clipboard API is unavailable in this environment.");
    }

    await navigator.clipboard.writeText(text);
}

export function ColorsPaletteGeneratorPage() {
    const theme = useTheme();
    const [rawHex, setRawHex] = React.useState(defaultBrandColor);
    const [copyStatus, setCopyStatus] = React.useState<string | null>(null);

    const normalizedHex = React.useMemo(
        () => (isHexColor(rawHex) ? normalizeHexColor(rawHex) : null),
        [rawHex],
    );
    const generatedPalette = React.useMemo(
        () =>
            normalizedHex === null
                ? null
                : generatePrimaryPalette(normalizedHex),
        [normalizedHex],
    );
    const alphaPalette = React.useMemo(
        () =>
            normalizedHex === null
                ? null
                : generatePrimaryAlphaPalette(normalizedHex),
        [normalizedHex],
    );
    const generatedPaletteJson = React.useMemo(
        () =>
            generatedPalette === null
                ? ""
                : formatPrimaryPaletteJson(
                      generatedPalette,
                      alphaPalette ?? undefined,
                  ),
        [alphaPalette, generatedPalette],
    );
    const generatedPaletteHexList = React.useMemo(
        () =>
            generatedPalette === null
                ? ""
                : formatPrimaryPaletteHexList(generatedPalette),
        [generatedPalette],
    );
    const approvedPalette = React.useMemo(
        () => getApprovedPrimaryPalette(theme.onyxia.brandMode),
        [theme.onyxia.brandMode],
    );

    const lightSurface = theme.onyxia.primitive[lightSurfaceTokenName];
    const darkSurface = theme.onyxia.primitive[darkSurfaceTokenName];

    return (
        <FoundationPage
            foundation="Colors"
            title="Primary palette generator"
            summary="A lightweight Storybook playground for exploring a draft primary branding palette from one anchor brand color. It is a designer-facing helper, not an official token source."
        >
            <FoundationSection
                title="Purpose and workflow"
                description="This playground helps explore a draft 50 to 950 primary palette anchored on one brand color. The generated output remains a proposal until it is reviewed, approved in Figma, and later integrated into the official token workflow."
            >
                <Alert severity="warning">
                    Draft proposal only. This tool does not modify approved
                    palettes, semantic color use cases, or Design System source
                    files.
                </Alert>
                <KeyValueList
                    items={[
                        {
                            label: "What it is",
                            value: "A lightweight helper for exploring a possible primary branding palette.",
                        },
                        {
                            label: "How to use it",
                            value: "Enter a brand color, review the generated scale, test the previews, copy the draft values, then review and update Figma manually if approved.",
                        },
                        {
                            label: "What it is not",
                            value: "Not a source of truth, not an automatic JSON writer, and not an approval workflow.",
                        },
                        {
                            label: "Relationship with Figma",
                            value: "Palette playground → designer exploration → manual review → Figma approval → normal token workflow.",
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
                        title="How to use it"
                        items={[
                            "Enter a brand color.",
                            "Review the draft palette progression from 50 to 950.",
                            "Check light and dark previews and contrast examples.",
                            "Copy the draft values for manual review.",
                        ]}
                    />
                    <GuidanceList
                        title="What it does not do"
                        items={[
                            "It does not write official palette JSON.",
                            "It does not create semantic use cases.",
                            "It does not change the production Onyxia theme.",
                            "It does not replace Figma as the Design System source of truth.",
                        ]}
                    />
                </Box>
            </FoundationSection>

            <FoundationSection
                title="Brand color input"
                description="The 500 step remains the exact normalized input color. The native picker and the hexadecimal field stay synchronized whenever the current value is valid."
            >
                <Stack spacing={3}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        alignItems={{ xs: "stretch", md: "center" }}
                    >
                        <TextField
                            label="Brand color picker"
                            type="color"
                            value={normalizedHex ?? defaultBrandColor}
                            onChange={event => {
                                setRawHex(
                                    normalizeHexColor(event.target.value),
                                );
                                setCopyStatus(null);
                            }}
                            sx={{ width: 160 }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                "aria-label": "Brand color picker",
                            }}
                        />
                        <TextField
                            label="Brand color hex"
                            value={rawHex}
                            onChange={event => {
                                setRawHex(event.target.value);
                                setCopyStatus(null);
                            }}
                            error={rawHex.length > 0 && normalizedHex === null}
                            helperText={
                                normalizedHex === null
                                    ? "Enter a valid 6-digit hex color like #FE3711."
                                    : "The 500 anchor remains exactly equal to this normalized value."
                            }
                            inputProps={{
                                "aria-describedby":
                                    "brand-color-hex-helper-text",
                            }}
                            sx={{ maxWidth: 280 }}
                        />
                    </Stack>
                    {copyStatus !== null && (
                        <Alert severity="info">{copyStatus}</Alert>
                    )}
                </Stack>
            </FoundationSection>

            <FoundationSection
                title="Generated draft palette"
                description="The palette updates immediately when the brand color is valid. The 500 anchor is highlighted because it remains the exact brand color used as the generator input."
            >
                {generatedPalette === null ? (
                    <Alert severity="error">
                        The palette cannot be generated until the hex input is
                        valid.
                    </Alert>
                ) : (
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
                        <Stack spacing={2}>
                            {primaryPaletteTonalSteps.map(step => (
                                <GeneratedPaletteRow
                                    key={step}
                                    tokenLabel={`primary-${step}`}
                                    color={generatedPalette[step]}
                                    highlight={step === 500}
                                />
                            ))}
                        </Stack>
                        <Stack spacing={3}>
                            <Paper
                                variant="outlined"
                                sx={{ p: theme.spacing(4) }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6">
                                        Copy values
                                    </Typography>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                    >
                                        <Button
                                            variant="contained"
                                            onClick={async () => {
                                                try {
                                                    await copyTextToClipboard(
                                                        generatedPaletteJson,
                                                    );
                                                    setCopyStatus(
                                                        "Draft palette JSON copied to the clipboard.",
                                                    );
                                                } catch (error) {
                                                    setCopyStatus(
                                                        error instanceof Error
                                                            ? error.message
                                                            : "Copy failed.",
                                                    );
                                                }
                                            }}
                                        >
                                            Copy JSON
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={async () => {
                                                try {
                                                    await copyTextToClipboard(
                                                        generatedPaletteHexList,
                                                    );
                                                    setCopyStatus(
                                                        "Draft HEX list copied to the clipboard.",
                                                    );
                                                } catch (error) {
                                                    setCopyStatus(
                                                        error instanceof Error
                                                            ? error.message
                                                            : "Copy failed.",
                                                    );
                                                }
                                            }}
                                        >
                                            Copy HEX list
                                        </Button>
                                    </Stack>
                                    <TextField
                                        label="Copyable JSON output"
                                        value={generatedPaletteJson}
                                        multiline
                                        minRows={8}
                                        fullWidth
                                        InputProps={{ readOnly: true }}
                                    />
                                </Stack>
                            </Paper>
                            <Paper
                                variant="outlined"
                                sx={{ p: theme.spacing(4) }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6">
                                        Approved brand comparison
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Comparison with the currently selected
                                        approved Storybook brand palette.
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "minmax(0, 1fr) minmax(0, 1fr)",
                                            gap: theme.spacing(2),
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            Generated draft
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Approved {theme.onyxia.brandMode}
                                        </Typography>
                                        {primaryPaletteTonalSteps.map(step => (
                                            <React.Fragment key={step}>
                                                <Box
                                                    sx={{
                                                        p: theme.spacing(2),
                                                        borderRadius:
                                                            theme.onyxia.radius.toCssValue(
                                                                "radius-2",
                                                            ),
                                                        backgroundColor:
                                                            generatedPalette[
                                                                step
                                                            ],
                                                        color: getReadableForeground(
                                                            {
                                                                background:
                                                                    generatedPalette[
                                                                        step
                                                                    ],
                                                                light: "#FFFFFF",
                                                                dark: theme
                                                                    .onyxia
                                                                    .primitive[
                                                                    darkSurfaceTokenName
                                                                ],
                                                            },
                                                        ),
                                                    }}
                                                >
                                                    primary-{step}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        p: theme.spacing(2),
                                                        borderRadius:
                                                            theme.onyxia.radius.toCssValue(
                                                                "radius-2",
                                                            ),
                                                        backgroundColor:
                                                            approvedPalette[
                                                                step
                                                            ],
                                                        color: getReadableForeground(
                                                            {
                                                                background:
                                                                    approvedPalette[
                                                                        step
                                                                    ],
                                                                light: "#FFFFFF",
                                                                dark: theme
                                                                    .onyxia
                                                                    .primitive[
                                                                    darkSurfaceTokenName
                                                                ],
                                                            },
                                                        ),
                                                    }}
                                                >
                                                    primary-{step}
                                                </Box>
                                            </React.Fragment>
                                        ))}
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>
                )}
            </FoundationSection>

            <FoundationSection
                title="Primary alpha tokens"
                description="The playground also shows the current primary alpha convention. These alpha values are derived from the 500 anchor and remain secondary to the main tonal scale."
            >
                {alphaPalette !== null && (
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
                        {Object.entries(alphaPalette).map(
                            ([tokenName, color]) => (
                                <Paper
                                    key={tokenName}
                                    variant="outlined"
                                    sx={{ p: 3 }}
                                >
                                    <Stack spacing={2}>
                                        <Typography variant="subtitle2">
                                            {tokenName}
                                        </Typography>
                                        <Box
                                            sx={{
                                                minHeight:
                                                    theme.onyxia.sizing.toCssValue(
                                                        "size-9",
                                                    ),
                                                borderRadius:
                                                    theme.onyxia.radius.toCssValue(
                                                        "radius-2",
                                                    ),
                                                backgroundImage:
                                                    "linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%), linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.08) 75%)",
                                                backgroundPosition:
                                                    "0 0, 12px 12px",
                                                backgroundSize: "24px 24px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    minHeight:
                                                        theme.onyxia.sizing.toCssValue(
                                                            "size-9",
                                                        ),
                                                    borderRadius:
                                                        theme.onyxia.radius.toCssValue(
                                                            "radius-2",
                                                        ),
                                                    backgroundColor: color,
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2">
                                            {color}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            ),
                        )}
                    </Box>
                )}
            </FoundationSection>

            <FoundationSection
                title="Accessibility preview"
                description="Contrast is contextual. These checks evaluate selected generated steps against representative light and dark neutral surfaces from the current approved brand context."
            >
                {generatedPalette !== null && (
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
                                px: theme.spacing(2),
                                verticalAlign: "top",
                            },
                        }}
                    >
                        <Box component="thead">
                            <Box component="tr">
                                <Box component="th">Foreground</Box>
                                <Box component="th">Background</Box>
                                <Box component="th">Ratio</Box>
                                <Box component="th">Normal text</Box>
                                <Box component="th">Large text / UI</Box>
                                <Box component="th">Interpretation</Box>
                            </Box>
                        </Box>
                        <Box component="tbody">
                            {[
                                {
                                    foreground: generatedPalette[700],
                                    foregroundLabel: "primary-700",
                                    background: lightSurface,
                                    backgroundLabel: "neutral-50",
                                },
                                {
                                    foreground: generatedPalette[900],
                                    foregroundLabel: "primary-900",
                                    background: lightSurface,
                                    backgroundLabel: "neutral-50",
                                },
                                {
                                    foreground: generatedPalette[50],
                                    foregroundLabel: "primary-50",
                                    background: darkSurface,
                                    backgroundLabel: "neutral-1000",
                                },
                                {
                                    foreground: generatedPalette[100],
                                    foregroundLabel: "primary-100",
                                    background: darkSurface,
                                    backgroundLabel: "neutral-1000",
                                },
                            ].map(row => {
                                const ratio = getContrastRatio(
                                    row.foreground,
                                    row.background,
                                );

                                return (
                                    <Box
                                        component="tr"
                                        key={row.foregroundLabel}
                                    >
                                        <Box component="td">
                                            {row.foregroundLabel}
                                            <br />
                                            {row.foreground}
                                        </Box>
                                        <Box component="td">
                                            {row.backgroundLabel}
                                            <br />
                                            {row.background}
                                        </Box>
                                        <Box component="td">
                                            {ratio.toFixed(2)}:1
                                        </Box>
                                        <Box component="td">
                                            <ContrastBadge
                                                ratio={ratio}
                                                kind="normal"
                                            />
                                        </Box>
                                        <Box component="td">
                                            <ContrastBadge
                                                ratio={ratio}
                                                kind="large"
                                            />
                                        </Box>
                                        <Box component="td">
                                            {getContrastInterpretation(ratio)}
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                )}
            </FoundationSection>

            <FoundationSection
                title="UI preview"
                description="These previews temporarily replace only the primary primitive palette, then reuse the existing semantic aliases and the current MUI mapping. The goal is to show how the real Onyxia color system would resolve, not to invent a second preview-only mapping."
            >
                {generatedPalette !== null && (
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
                        <PreviewPane
                            title="Light context preview"
                            colorMode="light"
                            palette={generatedPalette}
                            alphaPalette={
                                alphaPalette ??
                                generatePrimaryAlphaPalette(
                                    generatedPalette[500],
                                )
                            }
                        />
                        <PreviewPane
                            title="Dark context preview"
                            colorMode="dark"
                            palette={generatedPalette}
                            alphaPalette={
                                alphaPalette ??
                                generatePrimaryAlphaPalette(
                                    generatedPalette[500],
                                )
                            }
                        />
                    </Box>
                )}
            </FoundationSection>
        </FoundationPage>
    );
}
