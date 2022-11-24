import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Filter from "./Filter";

export default {
    title: "Example/Filter",
    component: Filter,
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Text = Template.bind({});
Text.args = {
    filterState: { currentFilter: "5km 이내", options: ["5km 이내", "3km 이내", "1km 이내"] },
};