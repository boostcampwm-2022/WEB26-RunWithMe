import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MapTypeControl from "./MapTypeControl";

export default {
    title: "MapControl/MapTypeControl",
    component: MapTypeControl,
} as ComponentMeta<typeof MapTypeControl>;

export const _MapTypeControl: ComponentStory<typeof MapTypeControl> = (args) => <MapTypeControl {...args} />;
