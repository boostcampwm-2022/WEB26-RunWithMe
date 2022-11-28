import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SearchBar from "./SearchBar";

export default {
    title: "SearchBar/SearchBar",
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const _SearchBar: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

_SearchBar.args = {
    placeholder: "placeholder",
};
