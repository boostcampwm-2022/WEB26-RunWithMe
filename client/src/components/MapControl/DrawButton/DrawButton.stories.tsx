import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DrawButton from "./DrawButton";

export default {
    title: "MapControl/DrawButton",
    component: DrawButton,
} as ComponentMeta<typeof DrawButton>;

export const _DrawButton: ComponentStory<typeof DrawButton> = (args) => <DrawButton {...args} />;
_DrawButton.args = {
    position: { top: "96px", right: "14px" },
};
