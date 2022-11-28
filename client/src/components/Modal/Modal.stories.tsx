import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "./Modal";
import Button from "#components/Button/Button";
import Input from "#components/Input/Input";

export default {
    title: "Example/Modal",
    component: Modal,
} as ComponentMeta<typeof Modal>;

export const _Modal: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

_Modal.args = {
    children: (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Input width="375px" placeholder="제목을 입력하세요" />
            <div style={{ height: "10px" }} />
            <Input width="375px" placeholder="인원수를 입력하세요" child="명" type="number" />
            <div style={{ height: "10px" }} />
            <Input width="375px" placeholder="집합 시간을 선택하세요" />
            <div style={{ height: "10px" }} />
            <Input width="375px" placeholder="페이스를 입력하세요" child="min/km" type="number" />
            <div style={{ height: "10px" }} />
            <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                <Button>등록</Button>
                <Button>취소</Button>
            </div>
        </div>
    ),
};
