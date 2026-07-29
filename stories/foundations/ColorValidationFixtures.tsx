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
    ThemeProvider,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createOnyxiaTheme, onyxiaBrandModes } from "../../src";

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
];

function useSemanticColor(tokenName) {
    return useTheme().onyxia.semantic.values[tokenName];
}

function SectionHeading({ eyebrow, title, description }) {
    return (
        <Stack spacing={1}>
            <Typography
                variant="overline"
                sx={{
                    color: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/contents/content-color-secondary"
                        ],
                    letterSpacing: "0.12em",
                }}
            >
                {eyebrow}
            </Typography>
            <Typography variant="h4">{title}</Typography>
            <Typography
                variant="body1"
                sx={{
                    maxWidth: 760,
                    color: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/contents/content-secondary"
                        ],
                }}
            >
                {description}
            </Typography>
        </Stack>
    );
}

function StatusIcon({ tokenName }) {
    const color = useSemanticColor(tokenName);

    return (
        <SvgIcon sx={{ color }}>
            <path d="M12 2 3 6.5v6.2c0 4.7 3.2 8.9 9 9.3 5.8-.4 9-4.6 9-9.3V6.5L12 2Zm0 3.1 5.5 2.7v4.8c0 3.2-2 6.2-5.5 6.7-3.5-.5-5.5-3.5-5.5-6.7V7.8L12 5.1Z" />
        </SvgIcon>
    );
}

function SurfacePanel({
    title,
    subtitle,
    surfaceToken,
    contentToken,
    borderToken = "usecases/borders/border-neutral-primary",
    iconToken = contentToken,
}) {
    const surfaceColor = useSemanticColor(surfaceToken);
    const contentColor = useSemanticColor(contentToken);
    const borderColor = useSemanticColor(borderToken);

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2.5,
                height: "100%",
                backgroundColor: surfaceColor,
                borderColor,
                color: contentColor,
            }}
        >
            <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <StatusIcon tokenName={iconToken} />
                    <Typography variant="subtitle1">{title}</Typography>
                </Stack>
                <Typography
                    variant="body2"
                    sx={{
                        color: contentColor,
                    }}
                >
                    {subtitle}
                </Typography>
            </Stack>
        </Paper>
    );
}

function BorderSwatches() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Semantic Borders</Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 1.5,
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
                            backgroundColor: theme =>
                                theme.onyxia.semantic.values[
                                    "usecases/surface/surface-primary"
                                ],
                            borderColor: theme =>
                                theme.onyxia.semantic.values[tokenName],
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                        >
                            <StatusIcon tokenName={tokenName} />
                            <Typography variant="body2">{label}</Typography>
                        </Stack>
                    </Paper>
                ))}
            </Box>
        </Stack>
    );
}

function ButtonShowcase() {
    const buttonStates = [
        { label: "Default" },
        { label: "Hover", simulatedState: "hover" },
        { label: "Pressed", simulatedState: "pressed" },
        { label: "Focus", simulatedState: "focus" },
        { label: "Disabled", disabled: true },
    ];

    const buttonRows = [
        { label: "Primary", color: "primary" },
        { label: "Secondary", color: "secondary" },
        { label: "Destructive", color: "error" },
    ];

    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Buttons</Typography>
            <Typography
                variant="body2"
                sx={{
                    color: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/contents/content-secondary"
                        ],
                }}
            >
                Hover, pressed, and focus examples use the same semantic MUI
                button styles as runtime components through simulated states.
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 1.5,
                    gridTemplateColumns: {
                        xs: "minmax(0, 1fr)",
                        xl: "repeat(5, minmax(0, 1fr))",
                    },
                }}
            >
                {buttonRows.map(({ label, color }) => (
                    <Paper
                        key={label}
                        variant="outlined"
                        sx={{
                            p: 2,
                            backgroundColor: theme =>
                                theme.onyxia.semantic.values[
                                    "usecases/surface/surface-primary"
                                ],
                            borderColor: theme =>
                                theme.onyxia.semantic.values[
                                    "usecases/borders/border-neutral-primary"
                                ],
                        }}
                    >
                        <Stack spacing={1.25}>
                            <Typography variant="subtitle2">{label}</Typography>
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
                                            data-simulated-state={
                                                simulatedState
                                            }
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
        </Stack>
    );
}

function TextFieldShowcase() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Text Fields</Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 1.5,
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
                    helperText="Mapped through the active MUI theme."
                />
                <TextField
                    fullWidth
                    focused
                    variant="outlined"
                    label="Focused"
                    defaultValue="Focus indicator"
                    helperText="Uses the theme focus mapping."
                />
                <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    label="Disabled"
                    defaultValue="Unavailable"
                    helperText="Disabled state"
                />
                <TextField
                    fullWidth
                    error
                    variant="outlined"
                    label="Error"
                    defaultValue="Validation issue"
                    helperText="Error mapping"
                />
            </Box>
        </Stack>
    );
}

function AlertShowcase() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Status Messages</Typography>
            <Stack spacing={1.5}>
                <Alert severity="success">Success feedback</Alert>
                <Alert severity="warning">Warning feedback</Alert>
                <Alert severity="error">Danger feedback</Alert>
                <Alert severity="info">Information feedback</Alert>
            </Stack>
        </Stack>
    );
}

function SurfaceStatesShowcase() {
    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Surface States</Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 1.5,
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
                    subtitle="Hover state uses the shared surface hover semantic."
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
        </Stack>
    );
}

function OverlayShowcase() {
    const overlayColor = useSemanticColor("usecases/overlay/default");

    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Overlay Example</Typography>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 3,
                    border: 1,
                    borderColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                    backgroundColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    minHeight: 220,
                    p: 3,
                }}
            >
                <Stack spacing={1.5}>
                    <Typography variant="subtitle1">
                        Underlying surface
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            maxWidth: 420,
                            color: theme =>
                                theme.onyxia.semantic.values[
                                    "usecases/contents/content-secondary"
                                ],
                        }}
                    >
                        This block shows how the semantic overlay separates a
                        foreground panel from the page surface without any
                        component-local color branching.
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: overlayColor,
                    }}
                />
                <Paper
                    variant="outlined"
                    sx={{
                        position: "absolute",
                        right: 24,
                        bottom: 24,
                        width: 280,
                        p: 2,
                        backgroundColor: theme =>
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-secondary"
                            ],
                        borderColor: theme =>
                            theme.onyxia.semantic.values[
                                "usecases/borders/border-neutral-primary"
                            ],
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="subtitle2">
                            Foreground panel
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme =>
                                    theme.onyxia.semantic.values[
                                        "usecases/contents/content-secondary"
                                    ],
                            }}
                        >
                            Overlay tint comes from the semantic layer.
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Stack>
    );
}

function ShadowShowcase() {
    const shadowLevels = [
        {
            label: "Level 1",
            boxShadow: `0px 4px 12px 0px ${useSemanticColor(
                "usecases/shadow/shadow-color-1",
            )}`,
        },
        {
            label: "Level 2",
            boxShadow: `0px 8px 20px 0px ${useSemanticColor(
                "usecases/shadow/shadow-color-2",
            )}`,
        },
        {
            label: "Level 3",
            boxShadow: `0px 12px 28px 0px ${useSemanticColor(
                "usecases/shadow/shadow-color-3",
            )}`,
        },
        {
            label: "Level 4",
            boxShadow: `0px 16px 36px 0px ${useSemanticColor(
                "usecases/shadow/shadow-color-4",
            )}`,
        },
    ];

    return (
        <Stack spacing={1.5}>
            <Typography variant="h6">Shadow Preview</Typography>
            <Typography
                variant="body2"
                sx={{
                    color: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/contents/content-secondary"
                        ],
                }}
            >
                Each elevation preview uses the semantic shadow color tokens
                from the active Onyxia theme.
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                        xs: "minmax(0, 1fr)",
                        md: "repeat(4, minmax(0, 1fr))",
                    },
                }}
            >
                {shadowLevels.map(level => (
                    <Paper
                        key={level.label}
                        sx={{
                            p: 2.5,
                            boxShadow: level.boxShadow,
                            backgroundColor: theme =>
                                theme.onyxia.semantic.values[
                                    "usecases/surface/surface-primary"
                                ],
                        }}
                    >
                        <Typography variant="subtitle2">
                            {level.label}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Stack>
    );
}

function ComponentsOnlyShowcase() {
    return (
        <Stack spacing={3}>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2, md: 3 },
                    backgroundColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    borderColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                }}
            >
                <Stack spacing={3}>
                    <ButtonShowcase />
                    <Divider />
                    <TextFieldShowcase />
                    <Divider />
                    <AlertShowcase />
                </Stack>
            </Paper>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2, md: 3 },
                    backgroundColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-secondary"
                        ],
                    borderColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                }}
            >
                <SurfaceStatesShowcase />
            </Paper>
        </Stack>
    );
}

function OverviewShowcase() {
    const primaryContentColor = useSemanticColor(
        "usecases/contents/content-primary",
    );
    const secondaryContentColor = useSemanticColor(
        "usecases/contents/content-secondary",
    );

    return (
        <Stack spacing={3}>
            <Box
                sx={{
                    display: "grid",
                    gap: 1.5,
                    gridTemplateColumns: {
                        xs: "minmax(0, 1fr)",
                        lg: "repeat(3, minmax(0, 1fr))",
                    },
                }}
            >
                <SurfacePanel
                    title="Page Background"
                    subtitle="Background, primary text, and icons should stay readable in every palette and mode."
                    surfaceToken="usecases/backgrounds/background"
                    contentToken="usecases/contents/content-primary"
                />
                <SurfacePanel
                    title="Primary Surface"
                    subtitle="Core panels use the primary surface semantic token."
                    surfaceToken="usecases/surface/surface-primary"
                    contentToken="usecases/contents/content-primary"
                />
                <SurfacePanel
                    title="Secondary Surface"
                    subtitle="Secondary surfaces provide layering without raw color picks."
                    surfaceToken="usecases/surface/surface-secondary"
                    contentToken="usecases/contents/content-secondary"
                    iconToken="usecases/contents/content-color-secondary"
                />
            </Box>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2, md: 3 },
                    backgroundColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    borderColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h6">
                        Semantic Typography and Icons
                    </Typography>
                    <Stack spacing={0.75}>
                        <Typography sx={{ color: primaryContentColor }}>
                            Primary content uses semantic foreground resolution.
                        </Typography>
                        <Typography sx={{ color: secondaryContentColor }}>
                            Secondary content stays legible without local mode
                            checks.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <StatusIcon tokenName="usecases/contents/content-primary" />
                        <StatusIcon tokenName="usecases/contents/content-secondary" />
                        <StatusIcon tokenName="usecases/contents/content-color-secondary" />
                    </Stack>
                </Stack>
            </Paper>
            <Paper
                variant="outlined"
                sx={{
                    p: { xs: 2, md: 3 },
                    backgroundColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-secondary"
                        ],
                    borderColor: theme =>
                        theme.onyxia.semantic.values[
                            "usecases/borders/border-neutral-primary"
                        ],
                }}
            >
                <Stack spacing={3}>
                    <BorderSwatches />
                    <Divider />
                    <ButtonShowcase />
                    <Divider />
                    <TextFieldShowcase />
                    <Divider />
                    <AlertShowcase />
                    <Divider />
                    <SurfaceStatesShowcase />
                    <Divider />
                    <OverlayShowcase />
                    <Divider />
                    <ShadowShowcase />
                </Stack>
            </Paper>
        </Stack>
    );
}

export function ColorValidationPage({ variant = "overview" }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: { xs: 2, md: 4 },
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/backgrounds/background"
                    ],
                color: theme.onyxia.semantic.values[
                    "usecases/contents/content-primary"
                ],
            }}
        >
            <Stack spacing={4}>
                <SectionHeading
                    eyebrow={`brand: ${theme.onyxia.brandMode} · mode: ${theme.onyxia.colorMode}`}
                    title="Onyxia color validation"
                    description="Visual validation of the first semantic color layer and the current MUI palette mapping. All samples resolve through the active Onyxia theme rather than duplicating token logic inside the stories."
                />
                {variant === "overview" ? (
                    <OverviewShowcase />
                ) : (
                    <ComponentsOnlyShowcase />
                )}
            </Stack>
        </Box>
    );
}

function BrandComparisonCard({ brandMode, colorMode, isSelected }) {
    const theme = React.useMemo(
        () =>
            createOnyxiaTheme({
                brandMode,
                colorMode,
            }),
        [brandMode, colorMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <Paper
                variant="outlined"
                sx={{
                    p: 2.5,
                    height: "100%",
                    backgroundColor: localTheme =>
                        localTheme.onyxia.semantic.values[
                            "usecases/backgrounds/background"
                        ],
                    borderColor: localTheme =>
                        isSelected
                            ? localTheme.onyxia.semantic.values[
                                  "usecases/borders/border-focus"
                              ]
                            : localTheme.onyxia.semantic.values[
                                  "usecases/borders/border-neutral-primary"
                              ],
                }}
            >
                <Stack spacing={2.5}>
                    <Stack spacing={0.25}>
                        <Typography variant="subtitle1">{brandMode}</Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: localTheme =>
                                    localTheme.onyxia.semantic.values[
                                        "usecases/contents/content-secondary"
                                    ],
                            }}
                        >
                            {colorMode} mode
                            {isSelected ? " · selected in toolbar" : ""}
                        </Typography>
                    </Stack>
                    <SurfacePanel
                        title="Surface"
                        subtitle="Primary surface plus semantic content."
                        surfaceToken="usecases/surface/surface-primary"
                        contentToken="usecases/contents/content-primary"
                    />
                    <Stack
                        direction="row"
                        spacing={1.5}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Button variant="contained" color="primary">
                            Primary
                        </Button>
                        <Button variant="contained" color="secondary">
                            Secondary
                        </Button>
                    </Stack>
                    <Alert severity="info">Info state</Alert>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: localTheme =>
                                localTheme.onyxia.semantic.values[
                                    "usecases/surface/surface-selected"
                                ],
                            border: 1,
                            borderColor: localTheme =>
                                localTheme.onyxia.semantic.values[
                                    "usecases/borders/border-focus-low"
                                ],
                        }}
                    >
                        <Typography variant="body2">
                            Selected surface
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </ThemeProvider>
    );
}

export function BrandPaletteComparisonPage({ selectedBrandMode }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: { xs: 2, md: 4 },
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/backgrounds/background"
                    ],
                color: theme.onyxia.semantic.values[
                    "usecases/contents/content-primary"
                ],
            }}
        >
            <Stack spacing={4}>
                <SectionHeading
                    eyebrow={`mode: ${theme.onyxia.colorMode}`}
                    title="Palette comparison"
                    description="The same compact semantic fixture is rendered once per brand palette. The dark-mode toolbar still changes every sample through the real Onyxia theme factory, while the brand toolbar highlights the currently selected palette."
                />
                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            md: "repeat(2, minmax(0, 1fr))",
                            xl: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    {onyxiaBrandModes.map(brandMode => (
                        <BrandComparisonCard
                            key={brandMode}
                            brandMode={brandMode}
                            colorMode={theme.onyxia.colorMode}
                            isSelected={selectedBrandMode === brandMode}
                        />
                    ))}
                </Box>
            </Stack>
        </Box>
    );
}
