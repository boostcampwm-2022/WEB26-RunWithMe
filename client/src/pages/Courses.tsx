import React, { useState } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import Filter from "#components/Filter/Filter";
import Modal from "#components/Modal/Modal";
import useFilter from "#hooks/useFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import CourseCard from "#components/Card/CourseCard/CourseCard";

const Courses = () => {
    const [distanceFilter, setCurrentDistanceFilter] = useFilter({
        currentFilter: "5km 이내",
        options: ["5km 이내", "3km 이내", "1km 이내"],
    });

    const [timeFilter, setCurrentTimeFilter] = useFilter({
        currentFilter: "5시간 이내",
        options: ["5시간 이내", "3시간 이내", "1시간 이내"],
    });

    return (
        <>
            <Header text="코스 목록" />
            <SearchBar placeholder={PLACEHOLDER.SEARCH}></SearchBar>
            <FilterBar>
                <Filter filterState={distanceFilter} setCurrentFilterState={setCurrentDistanceFilter}></Filter>
                <Filter filterState={timeFilter} setCurrentFilterState={setCurrentTimeFilter}></Filter>
            </FilterBar>
            <div>asd</div>
        </>
    );
};
export default Courses;
