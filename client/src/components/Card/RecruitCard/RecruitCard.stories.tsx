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
            path: [
                { lat: 126.57091836134346, lng: 33.45090000378721 },
                { lat: 126.57004847387998, lng: 33.450635526049844 },
                { lat: 126.56931524544794, lng: 33.45101165404891 },
                { lat: 126.56932224193068, lng: 33.44959616387136 },
                { lat: 126.5700747443057, lng: 33.449670903389 },
                { lat: 126.570502727405, lng: 33.450123187413496 },
            ],
            pathLength: 60,
            hDong: {
                name: "잠실동",
            },
            createdAt: "2022-11-21T08:55:33.162Z",
            userId: "asdasd",
        },
    },
};
