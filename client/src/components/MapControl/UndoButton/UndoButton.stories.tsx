import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import UndoButton from "./UndoButton";

export default {
    title: "MapControl/UndoButton",
    component: UndoButton,
} as ComponentMeta<typeof UndoButton>;

export const _UndoButton: ComponentStory<typeof UndoButton> = (args) => <UndoButton {...args} />;
_UndoButton.args = { position: { bottom: "14px", right: "14px" } };
