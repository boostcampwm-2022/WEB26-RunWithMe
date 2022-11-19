import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";

const Courses = () => {
    return (
        <>
            <Header text="코스 목록" />
            <SearchBar></SearchBar>
            <div>asd</div>
        </>
    );
};
export default Courses;
