import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PlaceSearch from "./PlaceSearch";

export default {
    title: "MapControl/PlaceSearch",
    component: PlaceSearch,
} as ComponentMeta<typeof PlaceSearch>;

export const _PlaceSearch: ComponentStory<typeof PlaceSearch> = () => (
    <PlaceSearch getCenter={() => new kakao.maps.LatLng(33, 127)} setCenter={console.log} position={{}} />
);
_PlaceSearch.args = {
    position: { top: "96px", right: "14px" },
};
