import styled from "styled-components";
import { flexRowCenter } from "styles/flex";
import { ARROW_DOWN_ICON, LOCATION_ICON } from "#assets/icons";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";

//does not contain dropdown logic, only primitive filter skeleton

const FilterWrapper = styled.div`
    ${flexRowCenter}
    padding: 4px;
    border-radius: 20px;
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

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
`;

interface FilterProps {
    text: string;
    modalToggler: () => void;
}

const Filter = ({ text, modalToggler }: FilterProps) => {
    return (
        <FilterWrapper onClick={modalToggler}>
            <img src={LOCATION_ICON} />
            <p>{text}</p>
            <img src={ARROW_DOWN_ICON} />
        </FilterWrapper>
    );
};

export default Filter;
