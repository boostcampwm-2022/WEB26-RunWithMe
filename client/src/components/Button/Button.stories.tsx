import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
    title: "Button/Button",
    component: Button,
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Fill = Template.bind({});
Fill.args = {
    children: "버튼",
    width: "fill",
};

export const Contain = Template.bind({});
Contain.args = {
    children: "버튼",
    width: "fit",
};
