import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

const FilterBarWrapper = styled.div`
    ${flexRow};
    padding: 8px 8px;
    gap: 2rem;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
`;

interface FilterBarProps {
    children?: React.ReactNode;
}

const FilterBar = ({ children }: FilterBarProps) => {
    return <FilterBarWrapper>{children}</FilterBarWrapper>;
};

export default FilterBar;
