import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "./Modal";
import Button from "#components/Button/Button";

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
            <div style={{ display: "flex" }}>
                <Button
                    onClick={() => {
                        console.log("등록");
                    }}
                >
                    등록
                </Button>
                <Button
                    onClick={() => {
                        console.log("취소");
                    }}
                >
                    취소
                </Button>
            </div>
        </div>
    ),
};
