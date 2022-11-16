import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DetailLabel from "./DetailLabel";

export default {
    title: "Example/DetailLabel",
    component: DetailLabel,
} as ComponentMeta<typeof DetailLabel>;

export const _DetailLabel: ComponentStory<typeof DetailLabel> = (args) => <DetailLabel {...args} />;
_DetailLabel.args = {
    title: "페이스",
    value: `3'30"/km`,
};
