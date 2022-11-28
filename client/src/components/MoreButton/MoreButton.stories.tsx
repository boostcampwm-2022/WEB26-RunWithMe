import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MoreButton from "./MoreButton";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Button/MoreButton",
    component: MoreButton,
} as ComponentMeta<typeof MoreButton>;

export const _MoreButton: ComponentStory<typeof MoreButton> = (args) => (
    <MemoryRouter>
        <MoreButton {...args} />
    </MemoryRouter>
);

_MoreButton.args = {
    to: "/user",
};
