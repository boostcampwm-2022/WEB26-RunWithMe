import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PaceInput from "./PaceInput";

export default {
    title: "Input/PaceInput",
    component: PaceInput,
} as ComponentMeta<typeof PaceInput>;

export const _PaceInput: ComponentStory<typeof PaceInput> = (args) => <PaceInput {...args} />;
