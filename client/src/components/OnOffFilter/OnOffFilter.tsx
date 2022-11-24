import styled from "styled-components";

import { flexRowCenter } from "styles/flex";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";

const FilterWrapper = styled.div<{ filterState: boolean }>`
    ${flexRowCenter}
    padding: 4px 8px;
    border-radius: 20px;
    border: 1px solid #e6e0de;
    cursor: pointer;
    p {
        white-space: nowrap;
        ${fontMedium(COLOR.BLACK, 500)}
    }
    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    background-color: ${(props) => (props.filterState ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0)")};
`;

interface FilterProps {
    filterState: boolean;
    filterName: string;
    toggleFilterState: () => void;
}

const OnOffFilter = ({ filterState, filterName, toggleFilterState }: FilterProps) => {
    return (
        <FilterWrapper onClick={toggleFilterState} filterState={filterState}>
            <p>{filterName}</p>
        </FilterWrapper>
    );
};

export default OnOffFilter;
