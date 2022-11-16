import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
    title: "Example/Input",
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
    placeholder: "placeholder",
};

export const Password = Template.bind({});
Password.args = {
    placeholder: "placeholder",
    type: "password",
};

export const Number = Template.bind({});
Number.args = {
    placeholder: "placeholder",
    type: "number",
};

export const SubText = Template.bind({});
SubText.args = {
    placeholder: "placeholder",
    type: "number",
    subText: "min/km",
};
