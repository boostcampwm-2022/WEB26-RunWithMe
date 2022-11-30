import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import PlusButton from "./PlusButton";

export default {
    title: "Button/PlusButton",
    component: PlusButton,
} as ComponentMeta<typeof PlusButton>;

export const _PlusButton: ComponentStory<typeof PlusButton> = (args) => (
    <MemoryRouter>
        <PlusButton {...args} />
    </MemoryRouter>
);
_PlusButton.args = {
    to: "/user",
};
