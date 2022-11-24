import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RecruitCard from "./RecruitCard";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Card/RecruitCard",
    component: RecruitCard,
} as ComponentMeta<typeof RecruitCard>;

export const _RecruitCard: ComponentStory<typeof RecruitCard> = (args) => (
    <MemoryRouter>
        <div style={{ padding: "16px" }}>
            <RecruitCard {...args} />
        </div>
    </MemoryRouter>
);
_RecruitCard.args = {
    data: {
        id: 125,
        title: "gustas",
        startTime: "2022-11-25T14:50:00.000Z",
        maxPpl: 4,
        currentPpl: 1,
        userId: "guss95",
        createdAt: "2022-11-24T15:04:46.095Z",
        pace: 330,
        course: {
            id: 1,
            title: "Dirty Ho (Lan tou He)",
            img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
            path: "",
            pathLength: 60,
            hDong: {
                name: "잠실동",
            },
            createdAt: "2022-11-21T08:55:33.162Z",
        },
    },
};
