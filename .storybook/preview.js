import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDarkMode } from "storybook-dark-mode";
import { createOnyxiaTheme, onyxiaBrandModes } from "../src";

const prioritizedStories = [
    "Foundations/Colors/Overview",
    "Foundations/Colors/Components",
    "Foundations/Colors/Palette comparison",
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
        const theme = React.useMemo(
            () =>
                createOnyxiaTheme({
                    brandMode: context.globals.brandMode,
                    colorMode,
                }),
            [colorMode, context.globals.brandMode],
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
