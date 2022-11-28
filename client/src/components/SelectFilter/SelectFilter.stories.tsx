import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectFilter from "./SelectFilter";

export default {
    title: "Example/SelectFilter",
    component: SelectFilter,
} as ComponentMeta<typeof SelectFilter>;

const Template: ComponentStory<typeof SelectFilter> = (args) => <SelectFilter {...args} />;

export const Text = Template.bind({});
Text.args = {
    filterState: { text: "3 ~ 5KM", min: 3, max: 5 },
    filterOptions: [{ text: "3 ~ 5KM", min: 3, max: 5 }],
    filterDescription: "달리려는 총 거리를 선택해주세요",
    setCurrentFilterState: console.log,
};
