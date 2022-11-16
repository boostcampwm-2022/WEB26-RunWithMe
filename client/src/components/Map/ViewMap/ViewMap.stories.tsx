import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ViewMap from "./ViewMap";

export default {
    title: "Example/ViewMap",
    component: ViewMap,
} as ComponentMeta<typeof ViewMap>;

const Template: ComponentStory<typeof ViewMap> = (args) => <ViewMap {...args} />;

export const Course = Template.bind({});
Course.args = {
    height: "50vh",
};

export const Recruit = Template.bind({});
Recruit.args = {
    height: "70vh",
};
