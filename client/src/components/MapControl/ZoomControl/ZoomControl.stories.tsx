import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZoomControl from "./ZoomControl";

export default {
    title: "MapControl/ZoomControl",
    component: ZoomControl,
} as ComponentMeta<typeof ZoomControl>;

export const _ZoomControl: ComponentStory<typeof ZoomControl> = (args) => <ZoomControl {...args} />;
