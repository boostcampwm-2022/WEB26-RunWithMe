import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import OnOffFilter from "./OnOffFilter";

export default {
    title: "Example/OnOffFilter",
    component: OnOffFilter,
} as ComponentMeta<typeof OnOffFilter>;

const Template: ComponentStory<typeof OnOffFilter> = (args) => <OnOffFilter {...args} />;

export const Text = Template.bind({});
Text.args = {
    filterState: true,
    filterName: "제목",
    toggleFilterState: console.log,
};
