import { ComponentStory, ComponentMeta } from "@storybook/react";

import ConfirmModal from "./ConfirmModal";

export default {
    title: "Modal/ConfirmModal",
    component: ConfirmModal,
} as ComponentMeta<typeof ConfirmModal>;

export const _Modal: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;
