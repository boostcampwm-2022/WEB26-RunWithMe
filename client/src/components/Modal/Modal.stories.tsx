import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "./Modal";

export default {
    title: "Example/Modal",
    component: Modal,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const _Modal = Template.bind({});
_Modal.args = {
    content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input />
            <input />
            <input />
            <input />
            <input />
        </div>
    ),
};
