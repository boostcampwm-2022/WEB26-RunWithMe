import styled from "styled-components";
import { useState } from "react";
import { flexRowCenter } from "styles/flex";
import { ARROW_DOWN_ICON, LOCATION_ICON } from "#assets/icons";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";
import Modal from "#components/Modal/Modal";
import { ModalFilterWrapper } from "./Filter.style";

//does not contain dropdown logic, only primitive filter skeleton

const FilterWrapper = styled.div`
    ${flexRowCenter}
    padding: 4px;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #e6e0de;
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
    filterState: string;
    filterOptions: string[];
    filterDescription: string;
    setCurrentFilterState: any;
}

const Filter = ({ filterState, filterOptions, filterDescription, setCurrentFilterState }: FilterProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleFilterContentClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        setCurrentFilterState(target.innerText);
        handleToggleModal();
    };

    const createModalContents = (filterOptions: string[]) => {
        return filterOptions.map((filterName: string, i: number) => (
            <div key={i} onClick={handleFilterContentClick}>
                {filterName}
            </div>
        ));
    };

    return (
        <FilterWrapper onClick={handleToggleModal}>
            <Modal toggled={showModal} toggleVisible={handleToggleModal}>
                <ModalFilterWrapper>
                    <header>{filterDescription}</header>
                    {createModalContents(filterOptions)}
                    <button onClick={handleToggleModal}>닫기</button>
                </ModalFilterWrapper>
            </Modal>
            <img src={LOCATION_ICON} />
            <p>{filterState}</p>
            <img src={ARROW_DOWN_ICON} />
        </FilterWrapper>
    );
};

export default Filter;
