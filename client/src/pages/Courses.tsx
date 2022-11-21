import React, { useState } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import Filter from "#components/Filter/Filter";
import Modal from "#components/Modal/Modal";
import useFilter from "#hooks/useFilter";
import { PLACEHOLDER } from "#constants/placeholder";

const Courses = () => {
    const [showModal, setShowModal] = useState(true);
    //const [currentFilter, setCurrentFilter] = useFilter(initial );
    //const [currentTimeFilter, setCurrentTimeFilter] = useFilter({initial: , options: })
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({
        currentFilter: "5km 이내",
        options: ["5km 이내", "3km 이내", "1km 이내"],
    });

    const [modalContents, setModalContents] = useState(currentDistanceFilter.options);
    const modalToggler = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <Header text="코스 목록" />
            <SearchBar placeholder={PLACEHOLDER.SEARCH}></SearchBar>
            <Modal toggled={showModal} toggleVisible={modalToggler}>
                {modalContents.map((filter: string, i: number) => (
                    <div key={i}>{filter}</div>
                ))}
            </Modal>
            <FilterBar>
                <Filter modalToggler={modalToggler} text="거리순"></Filter>
                <Filter modalToggler={modalToggler} text="시간순"></Filter>
                <Filter modalToggler={modalToggler} text="시간순"></Filter>
            </FilterBar>
            <div>asd</div>
        </>
    );
};
export default Courses;
