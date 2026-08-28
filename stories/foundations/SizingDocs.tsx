import * as React from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import PhotoIcon from "@mui/icons-material/Photo";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    breakpointsValues,
    defaultOnyxiaIconSizeTokenName,
    Icon,
    onyxiaIconSizeTokenNames,
    onyxiaSizingTokenNames,
    type OnyxiaIconSizeTokenName,
    type OnyxiaSizingTokenName,
} from "../../src";
import { sizingTokens } from "../../src/tokens/generated/sizing";
import {
    FoundationPage,
    FoundationSection,
    GuidanceList,
    KeyValueList,
    useViewportWidth,
} from "./FoundationDocs";

type SizingDocumentationPageKey =
    | "overview"
    | "scale"
    | "icons"
    | "visual-elements"
    | "component-examples"
    | "responsive-sizing"
    | "mui-integration";

type SizingDocumentationPageProps = {
    page: SizingDocumentationPageKey;
};

const sizingScale = onyxiaSizingTokenNames.map(tokenName => ({
    tokenName,
    value: sizingTokens[tokenName],
}));

function SizingTokenChip(props: { tokenName: OnyxiaSizingTokenName }) {
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

function SizingScaleCard(props: {
    tokenName: OnyxiaSizingTokenName;
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
                    minHeight: theme.onyxia.sizing.toCssValue("size-9"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                        theme.onyxia.semantic.values[
                            "usecases/surface/surface-primary"
                        ],
                    borderRadius: theme.onyxia.radius.toCssValue("radius-2"),
                }}
            >
                <Box
                    sx={{
                        width: theme.onyxia.sizing.toCssValue(tokenName),
                        height: theme.onyxia.sizing.toCssValue(tokenName),
                        minWidth: theme.onyxia.sizing.toCssValue(tokenName),
                        borderRadius:
                            theme.onyxia.radius.toCssValue("radius-2"),
                        backgroundColor:
                            theme.onyxia.semantic.values[
                                "usecases/surface/surface-action-primary"
                            ],
                    }}
                />
            </Box>
        </Paper>
    );
}

function IconSizingCard(props: {
    tokenName: OnyxiaIconSizeTokenName;
    label: string;
}) {
    const { tokenName, label } = props;
    const theme = useTheme();
    const sizingToken = theme.onyxia.icon.sizingTokens[tokenName];

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
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: theme.onyxia.sizing.toCssValue("size-10"),
                    color: theme.onyxia.semantic.values[
                        "usecases/contents/content-primary"
                    ],
                }}
            >
                <Icon icon={SearchIcon} size={tokenName} />
            </Box>
            <Stack spacing={1}>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {tokenName} → {sizingToken} →{" "}
                    {theme.onyxia.icon.getSizeInPx(tokenName)}px
                </Typography>
            </Stack>
        </Paper>
    );
}

function VisualElementSpecimen(props: {
    title: string;
    tokenName: OnyxiaSizingTokenName;
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
                <SizingTokenChip tokenName={tokenName} />
            </Stack>
            {children}
        </Paper>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Sizing"
            title="Sizing"
            summary="The Sizing foundation defines the approved reusable dimensions used for repeated visual elements such as icons, avatars, thumbnails, placeholders, and fixed-size controls."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="Sizing keeps repeated visual dimensions consistent and prevents components from introducing arbitrary local width and height values when an approved shared size already exists."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Design intent",
                            value: "Reusable element dimensions, not layout spacing.",
                        },
                        {
                            label: "Theme API",
                            value: "Components consume shared sizes through theme.onyxia.sizing.",
                        },
                        {
                            label: "Icons relationship",
                            value: "Icon semantic sizes resolve through shared sizing tokens instead of a separate numeric scale.",
                        },
                        {
                            label: "MUI relationship",
                            value: "MUI remains a compatibility layer for approved dimensions, not the source of truth.",
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
                        title="When to use sizing"
                        items={[
                            "Use approved sizing tokens for repeated visual element dimensions.",
                            "Use sizing for icons, avatars, thumbnails, placeholders, and fixed-size controls.",
                            "Keep icon size and interactive hit area conceptually separate.",
                            "Prefer existing approved sizes before proposing a new shared token.",
                        ]}
                    />
                    <GuidanceList
                        title="What to avoid"
                        items={[
                            "Do not use sizing tokens as a replacement for padding, margin, or gap.",
                            "Do not infer extra intermediate sizes that are not approved in Figma.",
                            "Do not let MUI defaults become the Design System sizing source of truth.",
                            "Do not place component-specific size variant rules inside the generic sizing foundation.",
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
            foundation="Sizing"
            title="Approved scale"
            summary="The sizing scale is the primitive dimensional vocabulary for repeated visual elements. Each card shows the source token, its approved value, and a visual specimen resolved through the active Onyxia theme."
        >
            <FoundationSection
                title="Sizing tokens"
                description="The generated sizing registry is the numeric source of truth for reusable visual dimensions. The largest token remains a fixed approved size, not a layout instruction."
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
                    {sizingScale.map(({ tokenName, value }) => (
                        <SizingScaleCard
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

function IconsPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Sizing"
            title="Icon mapping"
            summary="Icons are a semantic consumer of the sizing foundation. Icon-size tokens stay stable for component authors while their dimensions resolve through the approved shared sizing scale."
        >
            <FoundationSection
                title="Shared dimensional hierarchy"
                description="Each example uses the real Onyxia Icon component and exposes the full relationship: semantic icon token, shared sizing token, and resolved dimension."
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
                    {onyxiaIconSizeTokenNames.map(tokenName => (
                        <IconSizingCard
                            key={tokenName}
                            tokenName={tokenName}
                            label={tokenName}
                        />
                    ))}
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function VisualElementsPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Sizing"
            title="Visual elements"
            summary="Sizing tokens are especially useful for repeated visual elements whose dimensions should remain consistent across the product."
        >
            <FoundationSection
                title="Representative visual usage"
                description="These examples show avatars, thumbnails, placeholders, and indicators consuming shared sizing tokens through the theme."
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
                    <VisualElementSpecimen
                        title="Avatar"
                        tokenName="size-9"
                        description="A repeated avatar size benefits from a shared approved dimension."
                    >
                        <Avatar
                            sx={{
                                width: theme.onyxia.sizing.toCssValue("size-9"),
                                height: theme.onyxia.sizing.toCssValue(
                                    "size-9",
                                ),
                                bgcolor:
                                    theme.onyxia.semantic.values[
                                        "usecases/surface/surface-action-primary"
                                    ],
                            }}
                        >
                            OS
                        </Avatar>
                    </VisualElementSpecimen>
                    <VisualElementSpecimen
                        title="Thumbnail"
                        tokenName="size-full"
                        description="The largest sizing token remains a fixed approved visual dimension, not a full-width layout behavior."
                    >
                        <Box
                            sx={{
                                width: theme.onyxia.sizing.toCssValue(
                                    "size-full",
                                ),
                                height: theme.onyxia.sizing.toCssValue(
                                    "size-full",
                                ),
                                maxWidth: "100%",
                                display: "grid",
                                placeItems: "center",
                                borderRadius:
                                    theme.onyxia.radius.toCssValue("radius-3"),
                                backgroundColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/surface/surface-tertiary"
                                    ],
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-secondary"
                                ],
                            }}
                        >
                            <Icon icon={PhotoIcon} size="icon-size-6" />
                        </Box>
                    </VisualElementSpecimen>
                    <VisualElementSpecimen
                        title="Image placeholder"
                        tokenName="size-11"
                        description="Placeholders for repeated empty media states can align to the shared scale."
                    >
                        <Box
                            sx={{
                                width: theme.onyxia.sizing.toCssValue(
                                    "size-11",
                                ),
                                height: theme.onyxia.sizing.toCssValue(
                                    "size-11",
                                ),
                                display: "grid",
                                placeItems: "center",
                                border: "1px dashed",
                                borderColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/borders/border-neutral-primary"
                                    ],
                                borderRadius:
                                    theme.onyxia.radius.toCssValue("radius-2"),
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-secondary"
                                ],
                            }}
                        >
                            <Icon icon={PhotoIcon} size="icon-size-5" />
                        </Box>
                    </VisualElementSpecimen>
                    <VisualElementSpecimen
                        title="Status indicator"
                        tokenName="size-4"
                        description="Small repeated indicators also benefit from shared dimensions instead of local ad hoc values."
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                                sx={{
                                    width: theme.onyxia.sizing.toCssValue(
                                        "size-4",
                                    ),
                                    height: theme.onyxia.sizing.toCssValue(
                                        "size-4",
                                    ),
                                    borderRadius:
                                        theme.onyxia.radius.toCssValue(
                                            "radius-full",
                                        ),
                                    backgroundColor:
                                        theme.onyxia.semantic.values[
                                            "usecases/surface/surface-action-success"
                                        ],
                                }}
                            />
                            <Typography variant="body2">
                                Visual indicator dimension from the shared
                                sizing scale.
                            </Typography>
                        </Stack>
                    </VisualElementSpecimen>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ComponentExamplesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Sizing"
            title="Component examples"
            summary="The sizing foundation provides values. Component examples show how those values can be applied to repeated MUI primitives and existing Onyxia icon usage without creating new production components."
        >
            <FoundationSection
                title="Representative component usage"
                description="These examples intentionally focus on fixed repeated visual dimensions rather than on layout widths or other contextual sizing concerns."
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
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Icon button and button icon
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={3}
                                alignItems="center"
                                useFlexGap
                                flexWrap="wrap"
                            >
                                <IconButton
                                    size="medium"
                                    aria-label="Add item"
                                    sx={{
                                        backgroundColor:
                                            theme.onyxia.semantic.values[
                                                "usecases/surface/surface-secondary"
                                            ],
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <Icon
                                            icon={SearchIcon}
                                            size={
                                                defaultOnyxiaIconSizeTokenName
                                            }
                                        />
                                    }
                                >
                                    Search
                                </Button>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                The icon dimension and the interactive target
                                remain related but separate decisions.
                            </Typography>
                        </Stack>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Avatar, badge, and fixed indicator
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={4}
                                alignItems="center"
                                useFlexGap
                                flexWrap="wrap"
                            >
                                <Avatar
                                    sx={{
                                        width: theme.onyxia.sizing.toCssValue(
                                            "size-8",
                                        ),
                                        height: theme.onyxia.sizing.toCssValue(
                                            "size-8",
                                        ),
                                    }}
                                >
                                    AB
                                </Avatar>
                                <Badge color="primary" variant="dot">
                                    <Avatar
                                        sx={{
                                            width: theme.onyxia.sizing.toCssValue(
                                                "size-10",
                                            ),
                                            height: theme.onyxia.sizing.toCssValue(
                                                "size-10",
                                            ),
                                        }}
                                    >
                                        CD
                                    </Avatar>
                                </Badge>
                                <Box
                                    sx={{
                                        width: theme.onyxia.sizing.toCssValue(
                                            "size-7",
                                        ),
                                        height: theme.onyxia.sizing.toCssValue(
                                            "size-7",
                                        ),
                                        display: "grid",
                                        placeItems: "center",
                                        borderRadius:
                                            theme.onyxia.radius.toCssValue(
                                                "radius-full",
                                            ),
                                        backgroundColor:
                                            theme.onyxia.semantic.values[
                                                "usecases/surface/surface-contrast-info"
                                            ],
                                        color: theme.onyxia.semantic.values[
                                            "usecases/contents/content-info"
                                        ],
                                    }}
                                >
                                    <Icon
                                        icon={SettingsIcon}
                                        size="icon-size-4"
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ResponsiveSizingPage() {
    const theme = useTheme();
    const viewportWidth = useViewportWidth();
    const resolvedToken =
        theme.onyxia.sizing.responsive.resolve<OnyxiaSizingTokenName>({
            xs: "size-6",
        });

    return (
        <FoundationPage
            foundation="Sizing"
            title="Responsive sizing"
            summary="The sizing scale is stable across breakpoints. Responsive behavior can select different approved tokens later without inventing a second sizing scale or changing the public API."
        >
            <FoundationSection
                title="Current responsive state"
                description="The current Figma sizing collection defines one shared mode. The theme still exposes centralized responsive resolution so future breakpoint-based token selection can remain foundation-level."
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
                            value: theme.onyxia.sizing.responsive
                                .activeBreakpoint,
                        },
                        {
                            label: "Current sizing mode",
                            value: "One shared approved scale",
                        },
                        {
                            label: "Neutral resolver example",
                            value: `${resolvedToken} → ${theme.onyxia.sizing.toCssValue(
                                resolvedToken,
                            )}`,
                        },
                    ]}
                />
            </FoundationSection>
            <FoundationSection
                title="Breakpoint consultation"
                description="Sizing can reuse the existing shared breakpoint architecture without introducing a sizing-specific breakpoint system."
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
                            <Box component="th">Sizing behavior</Box>
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
                                    Select approved sizing tokens only
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
            foundation="Sizing"
            title="MUI integration"
            summary="Onyxia sizing remains the source of truth. MUI receives focused compatibility for primitives that already expose visual-size behavior, while other usages consume theme.onyxia.sizing directly."
        >
            <FoundationSection
                title="Compatibility mapping"
                description="The examples below show both centralized MUI size overrides and direct component usage through theme.onyxia.sizing."
            >
                <KeyValueList
                    items={[
                        {
                            label: "SvgIcon small",
                            value: "Mapped to approved Onyxia icon-size-3",
                        },
                        {
                            label: "SvgIcon medium",
                            value: "Mapped to approved Onyxia icon-size-4",
                        },
                        {
                            label: "SvgIcon large",
                            value: "Mapped to approved Onyxia icon-size-5",
                        },
                        {
                            label: "IconButton sizes",
                            value: "Mapped centrally to approved Onyxia sizing tokens in the MUI layer.",
                        },
                    ]}
                />
            </FoundationSection>
            <FoundationSection
                title="Primitive validation"
                description="These specimens use the real MUI and Onyxia theme integration layer. No story-local pixel scale is introduced."
            >
                <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                    <Stack spacing={4}>
                        <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <SearchIcon fontSize="small" />
                            <SearchIcon fontSize="medium" />
                            <SearchIcon fontSize="large" />
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <IconButton size="small" aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                            <IconButton size="medium" aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                            <IconButton size="large" aria-label="Search">
                                <SearchIcon />
                            </IconButton>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <Avatar
                                sx={{
                                    width: theme.onyxia.sizing.toCssValue(
                                        "size-7",
                                    ),
                                    height: theme.onyxia.sizing.toCssValue(
                                        "size-7",
                                    ),
                                }}
                            >
                                EF
                            </Avatar>
                            <Avatar
                                sx={{
                                    width: theme.onyxia.sizing.toCssValue(
                                        "size-10",
                                    ),
                                    height: theme.onyxia.sizing.toCssValue(
                                        "size-10",
                                    ),
                                }}
                            >
                                GH
                            </Avatar>
                        </Stack>
                    </Stack>
                </Paper>
            </FoundationSection>
        </FoundationPage>
    );
}

export function SizingDocumentationPage(props: SizingDocumentationPageProps) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "scale":
            return <ScalePage />;
        case "icons":
            return <IconsPage />;
        case "visual-elements":
            return <VisualElementsPage />;
        case "component-examples":
            return <ComponentExamplesPage />;
        case "responsive-sizing":
            return <ResponsiveSizingPage />;
        case "mui-integration":
            return <MuiIntegrationPage />;
        default:
            return null;
    }
}
