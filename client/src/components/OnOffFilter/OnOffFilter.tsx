import styled from "styled-components";
import { useState } from "react";
import { flexRowCenter } from "styles/flex";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";
import Filter from "#components/Filter/Filter";

const FilterWrapper = styled.div`
    ${flexRowCenter}
    padding: 4px;
    border-radius: 20px;
    cursor: pointer;
    p {
        white-space: nowrap;
        ${fontMedium(COLOR.BLACK, 500)}
    }
`;

interface FilterProps {
    filterState: boolean;
    filterName: string;
    toggleFilterState: () => void;
}

const OnOffFilter = ({ filterState, filterName, toggleFilterState }: FilterProps) => {
    return <FilterWrapper></FilterWrapper>;
};

export default OnOffFilter;
