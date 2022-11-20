import React from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import Filter from "#components/Filter/Filter";

const Courses = () => {
    return (
        <>
            <Header text="코스 목록" />
            <SearchBar></SearchBar>
            <FilterBar>
                <Filter text="거리순"></Filter>
                <Filter text="시간순"></Filter>
            </FilterBar>
            <div>asd</div>
        </>
    );
};
export default Courses;
