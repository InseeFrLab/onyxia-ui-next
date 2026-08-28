import * as React from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

export function FoundationPage(props: {
    foundation: string;
    title: string;
    summary: string;
    children: ReactNode;
}) {
    const { foundation, title, summary, children } = props;
    const theme = useTheme();
    const spacing = theme.onyxia.spacing;

    return (
        <Box
            component="article"
            sx={{
                minHeight: "100vh",
                backgroundColor:
                    theme.onyxia.semantic.values[
                        "usecases/backgrounds/background"
                    ],
                color: theme.onyxia.semantic.values[
                    "usecases/contents/content-primary"
                ],
                px: {
                    xs: spacing.toCssValue("spacing-2"),
                    md: spacing.toCssValue("spacing-4"),
                },
                py: {
                    xs: spacing.toCssValue("spacing-3"),
                    md: spacing.toCssValue("spacing-5"),
                },
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
                        <Stack spacing={1}>
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
                                Design System / Foundations / {foundation}
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
                        <ContextChips />
                    </Stack>
                </Paper>
                {children}
            </Stack>
        </Box>
    );
}

export function ContextChips() {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
                label={`Brand: ${theme.onyxia.brandMode}`}
                variant="outlined"
            />
            <Chip
                label={`Mode: ${theme.onyxia.colorMode}`}
                variant="outlined"
            />
            <Chip
                label={`Breakpoint: ${theme.onyxia.spacing.responsive.activeBreakpoint}`}
                variant="outlined"
            />
            <Chip
                label={`Typography mode: ${theme.onyxia.typography.responsive.activeMode}`}
                variant="outlined"
            />
        </Stack>
    );
}

export function FoundationSection(props: {
    title: string;
    description: string;
    children: ReactNode;
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
                <Stack spacing={2}>
                    <Typography component="h2" variant="h4">
                        {title}
                    </Typography>
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{
                            maxWidth: 860,
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

export function FoundationSubsection(props: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    const { title, description, children } = props;
    const theme = useTheme();

    return (
        <Stack component="section" spacing={3}>
            <Stack spacing={1}>
                <Typography component="h3" variant="h5">
                    {title}
                </Typography>
                {description !== undefined && (
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{
                            maxWidth: 760,
                            color: theme.onyxia.semantic.values[
                                "usecases/contents/content-secondary"
                            ],
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </Stack>
            {children}
        </Stack>
    );
}

export function GuidanceList(props: { title: string; items: string[] }) {
    const { title, items } = props;
    const theme = useTheme();
    const spacing = theme.onyxia.spacing;

    return (
        <Paper
            variant="outlined"
            sx={{
                p: spacing.toCssValue("spacing-4"),
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
            <Stack spacing={2}>
                <Typography component="h3" variant="h6">
                    {title}
                </Typography>
                <Box
                    component="ul"
                    sx={{ m: 0, pl: spacing.toCssValue("spacing-4") }}
                >
                    {items.map(item => (
                        <Typography
                            key={item}
                            component="li"
                            variant="body2"
                            sx={{
                                mb: spacing.toCssValue("spacing-2"),
                                color: theme.onyxia.semantic.values[
                                    "usecases/contents/content-secondary"
                                ],
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
            </Stack>
        </Paper>
    );
}

export function KeyValueList(props: {
    items: Array<{ label: string; value: ReactNode }>;
}) {
    const { items } = props;
    const theme = useTheme();
    const spacing = theme.onyxia.spacing;

    return (
        <Box
            component="dl"
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "minmax(0, 1fr)",
                    md: "repeat(2, minmax(0, 1fr))",
                },
                gap: spacing.toCssValue("spacing-3"),
                m: 0,
            }}
        >
            {items.map(({ label, value }) => (
                <Paper
                    key={label}
                    variant="outlined"
                    sx={{
                        p: spacing.toCssValue("spacing-3"),
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
                    <Typography
                        component="dt"
                        variant="overline"
                        sx={{
                            color: theme.onyxia.semantic.values[
                                "usecases/contents/content-color-secondary"
                            ],
                        }}
                    >
                        {label}
                    </Typography>
                    <Typography component="dd" variant="body1" sx={{ m: 0 }}>
                        {value}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
}

export function useViewportWidth() {
    const [viewportWidth, setViewportWidth] = React.useState(() =>
        typeof window === "undefined" ? 0 : window.innerWidth,
    );

    React.useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return viewportWidth;
}
