module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
        "storybook-dark-mode",
    ],
    core: {
        builder: "webpack5",
    },
    babel: async options => ({
        ...options,
        presets: [
            ...(options.presets ?? []),
            require.resolve("@babel/preset-react"),
            require.resolve("@babel/preset-typescript"),
        ],
    }),
};
