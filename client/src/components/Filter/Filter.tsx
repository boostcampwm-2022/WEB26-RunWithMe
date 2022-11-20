import styled from "styled-components";
import { flexRowCenter } from "styles/flex";
import { ARROW_DOWN_ICON, LOCATION_ICON } from "#assets/icons";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";

//does not contain dropdown logic, only primitive filter

const FilterWrapper = styled.div`
    ${flexRowCenter}
    cursor: pointer;
    p {
        white-space: nowrap;
        ${fontMedium(COLOR.BLACK, 500)}
        font-family: "Noto Sans KR";
        margin: 0 10px 0 5px;
    }
    img {
        height: 18px;
    }
`;

interface FilterProps {
    text: string;
}

const Filter = ({ text }: FilterProps) => {
    return (
        <FilterWrapper>
            <img src={LOCATION_ICON} />
            <p>{text}</p>
            <img src={ARROW_DOWN_ICON} />
        </FilterWrapper>
    );
};

export default Filter;
