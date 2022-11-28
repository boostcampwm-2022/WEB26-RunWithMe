import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AddressSearchInput from "./AddressSearchInput";

export default {
    title: "Input/AddressSearchInput",
    component: AddressSearchInput,
} as ComponentMeta<typeof AddressSearchInput>;

export const _AddressSearchInput: ComponentStory<typeof AddressSearchInput> = () => (
    <AddressSearchInput setRegion={console.log} />
);
