import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import StartTimeInput from "./StartTimeInput";

export default {
    title: "Input/StartTimeInput",
    component: StartTimeInput,
} as ComponentMeta<typeof StartTimeInput>;

export const _StartTimeInput: ComponentStory<typeof StartTimeInput> = (args) => <StartTimeInput {...args} />;
