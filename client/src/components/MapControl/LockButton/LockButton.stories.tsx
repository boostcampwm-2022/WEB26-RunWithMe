import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LockButton from "./LockButton";

export default {
    title: "MapControl/LockButton",
    component: LockButton,
} as ComponentMeta<typeof LockButton>;

export const _LockButton: ComponentStory<typeof LockButton> = (args) => <LockButton {...args} />;
_LockButton.args = {
    position: { top: "96px", right: "14px" },
};
