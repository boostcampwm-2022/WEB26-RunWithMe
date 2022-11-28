import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import OnOffFilter from "./OnOffFilter";

export default {
    title: "Filter/OnOffFilter",
    component: OnOffFilter,
} as ComponentMeta<typeof OnOffFilter>;

export const _OnOffFilter: ComponentStory<typeof OnOffFilter> = (args) => <OnOffFilter {...args} />;

_OnOffFilter.args = {
    filterState: true,
    filterName: "제목",
    toggleFilterState: console.log,
};
