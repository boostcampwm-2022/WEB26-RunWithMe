import "../src/index.css";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: "fullscreen",
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: "iphonex",
    },
};
