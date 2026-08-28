import * as React from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningIcon from "@mui/icons-material/Warning";
import {
    defaultOnyxiaIconSizeTokenName,
    Icon,
    onyxiaIconSizeTokenNames,
    type OnyxiaIconComponent,
} from "../../src";
import {
    FoundationPage,
    FoundationSection,
    FoundationSubsection,
    GuidanceList,
    KeyValueList,
} from "./FoundationDocs";

type IconsDocumentationPageKey =
    | "overview"
    | "catalog"
    | "sizes"
    | "colors"
    | "with-text"
    | "icon-only"
    | "custom-icons";

type IconsDocumentationPageProps = {
    page: IconsDocumentationPageKey;
};

type CuratedIcon = {
    label: string;
    icon: OnyxiaIconComponent;
    category: string;
};

const curatedIcons: CuratedIcon[] = [
    { label: "Search", icon: SearchIcon, category: "Actions" },
    { label: "Close", icon: CloseIcon, category: "Actions" },
    { label: "Add", icon: AddIcon, category: "Actions" },
    { label: "Edit", icon: EditIcon, category: "Actions" },
    { label: "Delete", icon: DeleteIcon, category: "Actions" },
    { label: "Download", icon: DownloadIcon, category: "Actions" },
    { label: "Upload", icon: UploadIcon, category: "Actions" },
    { label: "Settings", icon: SettingsIcon, category: "Actions" },
    { label: "Menu", icon: MenuIcon, category: "Navigation" },
    { label: "ChevronLeft", icon: ChevronLeftIcon, category: "Navigation" },
    { label: "ExpandMore", icon: ExpandMoreIcon, category: "Navigation" },
    { label: "Public", icon: PublicIcon, category: "Navigation" },
    { label: "Visibility", icon: VisibilityIcon, category: "Utilities" },
    { label: "Help", icon: HelpIcon, category: "Utilities" },
    { label: "Info", icon: InfoIcon, category: "Status" },
    { label: "Warning", icon: WarningIcon, category: "Status" },
    { label: "Error", icon: ErrorIcon, category: "Status" },
    { label: "CheckCircle", icon: CheckCircleIcon, category: "Status" },
    { label: "Brightness4", icon: Brightness4Icon, category: "Utilities" },
];

function IconCard(props: CuratedIcon) {
    const { label, icon, category } = props;
    const theme = useTheme();

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(3),
                display: "grid",
                gap: theme.spacing(2),
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
            <Icon icon={icon} size={defaultOnyxiaIconSizeTokenName} />
            <Stack spacing={1}>
                <Typography variant="subtitle2">{label}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {category}
                </Typography>
            </Stack>
        </Paper>
    );
}

function OverviewPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Icons"
            summary="The Icons foundation defines how Onyxia communicates actions, states, and common concepts through a shared icon strategy centered on Material UI Icons and a small reusable component contract."
        >
            <FoundationSection
                title="Why this foundation exists"
                description="A consistent icon system makes interfaces easier to scan, easier to learn, and easier to maintain. The goal is clear communication, not decorative variety."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Primary source",
                            value: "Material UI Icons provide the default implementation for common interface symbols.",
                        },
                        {
                            label: "Shared contract",
                            value: "The Onyxia Icon component keeps size, color inheritance, and future custom-icon integration consistent.",
                        },
                        {
                            label: "Sizing source",
                            value: "Icon semantic sizes resolve through the shared Sizing foundation rather than through an unrelated local dimension scale.",
                        },
                        {
                            label: "Colors",
                            value: "Icons consume semantic content colors from the existing Color foundation.",
                        },
                        {
                            label: "Future custom SVGs",
                            value: "Custom icons remain possible, but only for approved Onyxia-specific or branding concepts.",
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
                        title="How to choose icons"
                        items={[
                            "Prefer an existing Material icon when it already expresses the intended meaning clearly.",
                            "Reuse the same icon for the same concept across the product whenever possible.",
                            "Keep icons aligned with text, spacing, and surrounding component density.",
                            "Reserve custom icons for real Design System needs, not stylistic variation.",
                        ]}
                    />
                    <GuidanceList
                        title="What to avoid"
                        items={[
                            "Do not invent local SVGs when a Material icon already exists.",
                            "Do not create a large local registry of the full Material icon package.",
                            "Do not hard-code colors when an icon should inherit semantic content color.",
                            "Do not assume the icon itself provides sufficient accessibility for an icon-only control.",
                        ]}
                    />
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function CatalogPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Curated icon catalog"
            summary="This catalog focuses on icons that are currently relevant to Onyxia usage and Figma-to-code implementation. It is intentionally curated rather than a full rendering of the Material icon package."
        >
            <FoundationSection
                title="Representative icons"
                description="The catalog below favors interface actions, navigation, utilities, and status communication that already appear in Onyxia or are expected in upcoming components."
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
                    {curatedIcons.map(icon => (
                        <IconCard key={icon.label} {...icon} />
                    ))}
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function SizesPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Semantic sizes"
            summary="Icons use semantic icon-size tokens that map to the shared Sizing foundation. Icon size remains distinct from touch target sizing and does not define a second primitive scale."
        >
            <FoundationSection
                title="Semantic icon mapping"
                description="Each specimen uses the shared Icon component. The icon token stays semantic while the active Onyxia theme resolves it through an approved shared sizing token."
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
                        <Paper
                            key={tokenName}
                            variant="outlined"
                            sx={{
                                p: theme.spacing(3),
                                display: "grid",
                                gap: theme.spacing(2),
                                justifyItems: "start",
                                borderColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/borders/border-neutral-primary"
                                    ],
                            }}
                        >
                            <Icon icon={SearchIcon} size={tokenName} />
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">
                                    {tokenName}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {theme.onyxia.icon.sizingTokens[tokenName]}{" "}
                                    → {theme.onyxia.icon.getSizeInPx(tokenName)}
                                    px
                                </Typography>
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function ColorsPage() {
    const theme = useTheme();

    const colorExamples = [
        {
            label: "Primary content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-primary"
            ],
        },
        {
            label: "Secondary content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-secondary"
            ],
        },
        {
            label: "Disabled content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-disabled"
            ],
        },
        {
            label: "Focus content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-focus"
            ],
        },
        {
            label: "Success content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-success"
            ],
        },
        {
            label: "Warning content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-warning"
            ],
        },
        {
            label: "Danger content",
            color: theme.onyxia.semantic.values[
                "usecases/contents/content-danger"
            ],
        },
    ];

    return (
        <FoundationPage
            foundation="Icons"
            title="Semantic colors"
            summary="Icons consume the existing Color foundation. In most text and component contexts they should inherit semantic content color rather than define an independent visual palette."
        >
            <FoundationSection
                title="Color inheritance"
                description="Each example below uses the same icon component and changes only the surrounding semantic color."
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
                    {colorExamples.map(({ label, color }) => (
                        <Paper
                            key={label}
                            variant="outlined"
                            sx={{
                                p: theme.spacing(3),
                                display: "flex",
                                alignItems: "center",
                                gap: theme.spacing(3),
                                color,
                                borderColor:
                                    theme.onyxia.semantic.values[
                                        "usecases/borders/border-neutral-primary"
                                    ],
                            }}
                        >
                            <Icon icon={InfoIcon} />
                            <Stack spacing={1}>
                                <Typography variant="body2">{label}</Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Semantic content token
                                </Typography>
                            </Stack>
                        </Paper>
                    ))}
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function WithTextPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Icons with text"
            summary="When icons appear next to text, the text usually provides the accessible name while the icon remains decorative and supports recognition, emphasis, or scanning."
        >
            <FoundationSection
                title="Representative integrations"
                description="These examples use the shared Icon component with MUI primitives and the existing typography, spacing, and color foundations."
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
                                Buttons and inline content
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: theme.spacing(2),
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<Icon icon={SearchIcon} />}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Icon icon={DownloadIcon} />}
                                >
                                    Download
                                </Button>
                            </Box>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <Icon icon={InfoIcon} />
                                <Typography variant="body2">
                                    The icon supports the message while the text
                                    carries the accessible meaning.
                                </Typography>
                            </Stack>
                            <Chip
                                icon={<Icon icon={SettingsIcon} />}
                                label="Settings"
                                variant="outlined"
                            />
                        </Stack>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: theme.spacing(4) }}>
                        <Stack spacing={3}>
                            <Typography variant="h6">
                                Inputs and navigation-like rows
                            </Typography>
                            <TextField
                                label="Search datasets"
                                placeholder="Type a keyword"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon icon={SearchIcon} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <List disablePadding>
                                <ListItem
                                    sx={{
                                        px: 0,
                                        gap: theme.spacing(2),
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                        <Icon icon={PublicIcon} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Language settings"
                                        secondary="Consistent icon meaning matters more than decorative variety."
                                    />
                                    <Icon icon={ExpandMoreIcon} />
                                </ListItem>
                            </List>
                        </Stack>
                    </Paper>
                </Box>
            </FoundationSection>
        </FoundationPage>
    );
}

function IconOnlySpecimen(props: {
    label: string;
    state: "default" | "hover" | "pressed" | "focus" | "disabled";
}) {
    const { label, state } = props;
    const theme = useTheme();

    const backgroundColor =
        state === "disabled"
            ? theme.onyxia.semantic.values["usecases/surface/surface-tertiary"]
            : state === "pressed"
            ? theme.onyxia.semantic.values[
                  "usecases/surface/surface-action-secondary-pressed"
              ]
            : state === "hover"
            ? theme.onyxia.semantic.values[
                  "usecases/surface/surface-action-secondary-hover"
              ]
            : theme.onyxia.semantic.values[
                  "usecases/surface/surface-secondary"
              ];
    const color =
        state === "disabled"
            ? theme.onyxia.semantic.values["usecases/contents/content-disabled"]
            : theme.onyxia.semantic.values["usecases/contents/content-primary"];
    const boxShadow =
        state === "focus"
            ? `0 0 0 4px ${theme.onyxia.semantic.values["usecases/borders/border-focus-low"]}`
            : undefined;

    return (
        <Paper
            variant="outlined"
            sx={{
                p: theme.spacing(3),
                display: "grid",
                gap: theme.spacing(2),
                borderColor:
                    theme.onyxia.semantic.values[
                        "usecases/borders/border-neutral-primary"
                    ],
            }}
        >
            <Tooltip title={label}>
                <span>
                    <IconButton
                        size="medium"
                        aria-label={label}
                        disabled={state === "disabled"}
                        sx={{
                            borderRadius:
                                theme.onyxia.radius.toCssValue("radius-full"),
                            backgroundColor,
                            color,
                            boxShadow,
                        }}
                    >
                        <Icon icon={CloseIcon} decorative />
                    </IconButton>
                </span>
            </Tooltip>
            <Typography variant="body2">{label}</Typography>
        </Paper>
    );
}

function IconOnlyPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Icon-only controls and accessibility"
            summary="Icon-only controls need an accessible name on the control itself. The visual icon is not enough, and decorative inline icons should not create duplicate screen-reader noise."
        >
            <FoundationSection
                title="Accessible icon-only controls"
                description="These examples keep the icon decorative while the control carries the accessible label. The specimens also show representative semantic states."
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: theme.spacing(3),
                        gridTemplateColumns: {
                            xs: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(5, minmax(0, 1fr))",
                        },
                    }}
                >
                    <IconOnlySpecimen label="Close dialog" state="default" />
                    <IconOnlySpecimen label="Close dialog" state="hover" />
                    <IconOnlySpecimen label="Close dialog" state="pressed" />
                    <IconOnlySpecimen label="Close dialog" state="focus" />
                    <IconOnlySpecimen label="Close dialog" state="disabled" />
                </Box>
                <Divider />
                <Alert severity="info">
                    Tooltips can reinforce discoverability, but they do not
                    replace the need for a proper accessible name.
                </Alert>
            </FoundationSection>
        </FoundationPage>
    );
}

function CustomIconsPage() {
    const theme = useTheme();

    return (
        <FoundationPage
            foundation="Icons"
            title="Future custom icons"
            summary="The icon architecture is prepared for approved Onyxia-specific SVG icons, but no local custom icons are registered in this repository yet."
        >
            <FoundationSection
                title="Current status"
                description="Custom icons should be added only when the Design System defines a concept that Material icons do not cover appropriately."
            >
                <KeyValueList
                    items={[
                        {
                            label: "Current repository state",
                            value: "No custom SVG icons are registered yet.",
                        },
                        {
                            label: "Future location",
                            value: "Custom icons belong under src/components/Icon/custom/.",
                        },
                        {
                            label: "Compatibility rule",
                            value: "Custom icons must remain compatible with the same shared Icon component contract as Material icons.",
                        },
                        {
                            label: "Design System gap rule",
                            value: "If no suitable Material icon and no approved custom icon exist, the gap should be reported instead of solved with an invented local SVG.",
                        },
                    ]}
                />
                <FoundationSubsection
                    title="Expected custom-icon requirements"
                    description="These rules keep future custom icons compatible with MUI and with semantic theme usage."
                >
                    <GuidanceList
                        title="Required constraints"
                        items={[
                            "Use SVG as the source asset.",
                            "Prefer currentColor when the icon should inherit semantic content color.",
                            "Preserve a meaningful viewBox and avoid fixed width/height styling inside the asset.",
                            "Do not duplicate a Material icon as a local SVG.",
                        ]}
                    />
                </FoundationSubsection>
            </FoundationSection>
        </FoundationPage>
    );
}

export function IconsDocumentationPage(props: IconsDocumentationPageProps) {
    const { page } = props;

    switch (page) {
        case "overview":
            return <OverviewPage />;
        case "catalog":
            return <CatalogPage />;
        case "sizes":
            return <SizesPage />;
        case "colors":
            return <ColorsPage />;
        case "with-text":
            return <WithTextPage />;
        case "icon-only":
            return <IconOnlyPage />;
        case "custom-icons":
            return <CustomIconsPage />;
        default:
            return null;
    }
}
