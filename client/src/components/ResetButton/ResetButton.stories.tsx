import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ResetButton from "./ResetButton";

export default {
    title: "Button/ResetButton",
    component: ResetButton,
} as ComponentMeta<typeof ResetButton>;

export const _ResetButton: ComponentStory<typeof ResetButton> = (args) => <ResetButton {...args} />;
