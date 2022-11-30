import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CourseCard from "./CourseCard";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Card/CourseCard",
    component: CourseCard,
} as ComponentMeta<typeof CourseCard>;

export const _CourseCard: ComponentStory<typeof CourseCard> = (args) => (
    <MemoryRouter>
        <div style={{ padding: "16px" }}>
            <CourseCard {...args} />
        </div>
    </MemoryRouter>
);
_CourseCard.args = {
    data: {
        id: 1,
        title: "Dirty Ho (Lan tou He)",
        img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
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
            name: "",
        },
        createdAt: "2022-11-21T08:55:33.162Z",
    },
};
