const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-create-react-app",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "#pages": path.resolve(__dirname, "../src/pages"),
            "#components": path.resolve(__dirname, "../src/components"),
            "#hooks": path.resolve(__dirname, "../src/hooks"),
            "#utils": path.resolve(__dirname, "../src/utils"),
            "#assets": path.resolve(__dirname, "../src/assets"),
            "#constants": path.resolve(__dirname, "../src/constants"),
            "#types": path.resolve(__dirname, "../src/types"),
            "styles/*": path.resolve(__dirname, "../src/styles"),
        };

        return config;
    },
};
