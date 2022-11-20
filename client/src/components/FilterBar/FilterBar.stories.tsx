import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilterBar from "./FilterBar";

export default {
    title: "Example/FilterBar",
    component: FilterBar,
} as ComponentMeta<typeof FilterBar>;

export const _FilterBar: ComponentStory<typeof FilterBar> = (args) => <FilterBar {...args} />;
