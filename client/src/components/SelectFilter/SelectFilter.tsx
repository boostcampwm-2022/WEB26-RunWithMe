import styled from "styled-components";
import { useState } from "react";
import { flexRowCenter } from "styles/flex";
import { ARROW_DOWN_ICON } from "#assets/icons";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";
import Modal from "#components/Modal/Modal";
import { ModalFilterWrapper } from "./SelectFilter.style";
import { FilterOption } from "#types/FilterOption";

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
    filterState: FilterOption;
    filterOptions: FilterOption[];

    filterDescription: string;
    setCurrentFilterState: any;
    filterIcon: any;
}

const Filter = ({ filterState, filterOptions, filterDescription, setCurrentFilterState, filterIcon }: FilterProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    const handleFilterContentClick = (filterOption: FilterOption) => () => {
        setCurrentFilterState(filterOption);
        handleToggleModal();
    };

    const createModalContents = (filterOptions: FilterOption[]) => {
        return filterOptions.map((FilterOption, i) => (
            <div key={i} onClick={handleFilterContentClick(FilterOption)}>
                {FilterOption.text}
            </div>
        ));
    };

    return (
        <FilterWrapper onClick={handleToggleModal}>
            {showModal && (
                <Modal toggleVisible={handleToggleModal}>
                    <ModalFilterWrapper>
                        <header>{filterDescription}</header>
                        {createModalContents(filterOptions)}
                        <button onClick={handleToggleModal}>닫기</button>
                    </ModalFilterWrapper>
                </Modal>
            )}
            <img width="14" height="14" alt="filterIcon" src={filterIcon} />
            <p>{filterState.text}</p>
            <img width="14" height="14" alt="ARROW_DOWN_ICON" src={ARROW_DOWN_ICON} />
        </FilterWrapper>
    );
};

export default Filter;
