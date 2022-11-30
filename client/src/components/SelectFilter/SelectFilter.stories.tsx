import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectFilter from "./SelectFilter";

export default {
    title: "Filter/SelectFilter",
    component: SelectFilter,
} as ComponentMeta<typeof SelectFilter>;

const _SelectFilter: ComponentStory<typeof SelectFilter> = (args) => <SelectFilter {...args} />;

_SelectFilter.args = {
    filterState: { text: "3 ~ 5KM", min: 3, max: 5 },
    filterOptions: [{ text: "3 ~ 5KM", min: 3, max: 5 }],
    filterDescription: "달리려는 총 거리를 선택해주세요",
    setCurrentFilterState: console.log,
};
