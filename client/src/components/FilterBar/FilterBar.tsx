import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

const FilterBarWrapper = styled.div`
    ${flexRow};
    padding: 8px 4px;
    gap: 0.5rem;
    overflow: scroll;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    ::-webkit-scrollbar {
        height: 0;
        width: 0; /* Remove scrollbar space */
        background: transparent; /* Optional: just make scrollbar invisible */
    }
`;

interface FilterBarProps {
    children?: React.ReactNode;
}

const FilterBar = ({ children }: FilterBarProps) => {
    return <FilterBarWrapper>{children}</FilterBarWrapper>;
};

export default FilterBar;
