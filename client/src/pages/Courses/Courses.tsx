import React, { useState, FormEventHandler } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import { LOCATION_ICON } from "#assets/icons";
import PlusButton from "#components/PlusButton/PlusButton";
import CourseList from "#components/CourseList/CorseList";

const Courses = () => {
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({ text: "3-5KM", min: 3, max: 5 });
    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);
    const [searchContent, setSearchContent] = useState("");

    const handleSearchContentChange: FormEventHandler<HTMLInputElement> = (e) => {
        setSearchContent(e.currentTarget.value);
    };

    return (
        <>
            <Header text="코스 목록" />
            <SearchBar
                placeholder={PLACEHOLDER.SEARCH}
                content={searchContent}
                onChange={handleSearchContentChange}
            ></SearchBar>
            <FilterBar>
                <OnOffFilter
                    filterState={titleFilter}
                    filterName="제목"
                    toggleFilterState={toggleTitleFilter}
                ></OnOffFilter>
                <OnOffFilter
                    filterState={authorFilter}
                    filterName="작성자"
                    toggleFilterState={toggleAuthorFilter}
                ></OnOffFilter>
                <SelectFilter
                    filterIcon={LOCATION_ICON}
                    filterState={currentDistanceFilter}
                    filterOptions={[
                        { text: "3-5KM", min: 3, max: 5 },
                        { text: "1-3KM", min: 1, max: 3 },
                        { text: "1KM 이내", min: 0, max: 1 },
                    ]}
                    filterDescription="달리려는 총 거리를 선택해주세요"
                    setCurrentFilterState={setCurrentDistanceFilter}
                ></SelectFilter>
            </FilterBar>
            <CourseList
                distance={currentDistanceFilter}
                query={searchContent}
                authorFilter={authorFilter}
                titleFilter={titleFilter}
            />
            <PlusButton to="/course/new"></PlusButton>
        </>
    );
};

export default Courses;
