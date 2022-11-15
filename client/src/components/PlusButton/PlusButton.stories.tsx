import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import PlusButton from "./PlusButton";

export default {
    title: "Example/PlusButton",
    component: PlusButton,
} as ComponentMeta<typeof PlusButton>;

export const Template: ComponentStory<typeof PlusButton> = (args) => (
    <MemoryRouter>
        <PlusButton {...args} />
    </MemoryRouter>
);
Template.args = {
    to: "/user",
};
