import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DimmedModal from "./DimmedModal";

export default {
    title: "Example/DimmedModal",
    component: DimmedModal,
} as ComponentMeta<typeof DimmedModal>;

export const _DimmedModal: ComponentStory<typeof DimmedModal> = (args) => <DimmedModal {...args} />;
