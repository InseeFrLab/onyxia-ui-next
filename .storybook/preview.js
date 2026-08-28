import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDarkMode } from "storybook-dark-mode";
import { createOnyxiaTheme, onyxiaBrandModes } from "../src";
import "../src/assets/fonts/index.css";

const prioritizedStories = [
    "Design System/Foundations/Colors/Overview",
    "Design System/Foundations/Colors/Palettes",
    "Design System/Foundations/Colors/Semantic use cases",
    "Design System/Foundations/Colors/Palette generator",
    "Design System/Foundations/Spacing/Overview",
    "Design System/Foundations/Spacing/Scale",
    "Design System/Foundations/Spacing/Relationships",
    "Design System/Foundations/Sizing/Overview",
    "Design System/Foundations/Sizing/Scale",
    "Design System/Foundations/Sizing/Icon mapping",
    "Design System/Foundations/Radius/Overview",
    "Design System/Foundations/Radius/Scale",
    "Design System/Foundations/Radius/Hierarchy",
    "Design System/Foundations/Icons/Overview",
    "Design System/Foundations/Icons/Catalog",
    "Design System/Foundations/Icons/Semantic sizes",
    "Design System/Foundations/Typography/Overview",
    "Design System/Foundations/Typography/Typefaces",
    "Design System/Foundations/Typography/Semantic hierarchy",
    "Components/Button/Overview",
    "Components/Button/Variants",
    "Components/Button/Sizes",
    "Components/Button/States",
    "Components/Button/Icons",
    "Components/Button/Accessibility",
    "Components/Button/Playground",
    "Components/TextField/Overview",
    "Components/TextField/States",
    "Components/TextField/Helper & error",
    "Components/TextField/Icons / adornments",
    "Components/TextField/Accessibility",
    "Components/TextField/Playground",
    "Components/SearchBar/Overview",
    "Components/SearchBar/States",
    "Components/SearchBar/Sizes",
    "Components/SearchBar/Filled / clear behavior",
    "Components/SearchBar/Accessibility",
    "Components/SearchBar/Playground",
];

export const globalTypes = {
    brandMode: {
        name: "Brand Palette",
        description: "Active Onyxia brand palette",
        defaultValue: onyxiaBrandModes[0],
        toolbar: {
            icon: "paintbrush",
            items: onyxiaBrandModes.map(brandMode => ({
                value: brandMode,
                title: brandMode,
            })),
            dynamicTitle: true,
        },
    },
};

export const decorators = [
    (Story, context) => {
        const colorMode = useDarkMode() ? "dark" : "light";
        const [windowInnerWidth, setWindowInnerWidth] = React.useState(() =>
            typeof window === "undefined" ? 1920 : window.innerWidth,
        );

        React.useEffect(() => {
            if (typeof window === "undefined") {
                return undefined;
            }

            const handleResize = () => {
                setWindowInnerWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);

        const theme = React.useMemo(
            () =>
                createOnyxiaTheme({
                    brandMode: context.globals.brandMode,
                    colorMode,
                    windowInnerWidth,
                }),
            [colorMode, context.globals.brandMode, windowInnerWidth],
        );

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        );
    },
];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    darkMode: {
        current: "light",
    },
    layout: "fullscreen",
    viewport: {
        defaultViewport: "macBookProMedium",
        viewports: {
            "1440p": {
                name: "1440p",
                styles: {
                    width: "2560px",
                    height: "1440px",
                },
            },
            fullHD: {
                name: "Full HD",
                styles: {
                    width: "1920px",
                    height: "1080px",
                },
            },
            macBookProBig: {
                name: "MacBook Pro Big",
                styles: {
                    width: "1024px",
                    height: "640px",
                },
            },
            macBookProMedium: {
                name: "MacBook Pro Medium",
                styles: {
                    width: "1440px",
                    height: "900px",
                },
            },
            macBookProSmall: {
                name: "MacBook Pro Small",
                styles: {
                    width: "1680px",
                    height: "1050px",
                },
            },
            pcINSEE: {
                name: "PC Agent INSEE",
                styles: {
                    width: "960px",
                    height: "540px",
                },
            },
            verySmallLandscape: {
                name: "Very small landscape",
                styles: {
                    width: "599px",
                    height: "337px",
                },
            },
        },
    },
    options: {
        storySort: (a, b) =>
            getStoryWeight(b[1].title ?? b[1].kind) -
            getStoryWeight(a[1].title ?? a[1].kind),
    },
};

function getStoryWeight(title) {
    const storyTitle = title.toLowerCase();

    for (let index = 0; index < prioritizedStories.length; index += 1) {
        if (storyTitle.includes(prioritizedStories[index].toLowerCase())) {
            return prioritizedStories.length - index;
        }
    }

    return 0;
}
