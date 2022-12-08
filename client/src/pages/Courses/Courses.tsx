import React, { useState, FormEventHandler, useRef } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { LOCATION_ICON } from "#assets/icons";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import PlusButton from "#components/PlusButton/PlusButton";
import useCourseListQuery from "#hooks/queries/useCourseListQuery";
import { CourseFilterParams } from "#types/FilterParams";

const CourseList = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Courses = () => {
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({ text: "3-5KM", min: 3, max: 5 });

    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);
    const [searchContent, setSearchContent] = useState("");

    const page = useRef(1);
    const { data, fetchNextPage, isLoading, hasNextPage, remove } = useCourseListQuery();

    const resetFilter = () => {
        page.current = 1;
        remove();
        fetchNextPage({ pageParam: courseQueryParams() });
    };

    const handleSearchContentChange: FormEventHandler<HTMLInputElement> = (e) => {
        setSearchContent(e.currentTarget.value);
    };

    const courseQueryParams = (): CourseFilterParams => {
        const param: CourseFilterParams = {
            maxLen: (currentDistanceFilter.max * 1000).toString(),
            minLen: (currentDistanceFilter.min * 1000).toString(),
            page: page.current,
            title: titleFilter ? "true" : "false",
            author: authorFilter ? "true" : "false",
        };
        if (searchContent !== "") param.query = searchContent;
        return param;
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Header text="코스 목록" />
            <SearchBar
                placeholder={PLACEHOLDER.SEARCH}
                content={searchContent}
                onChange={handleSearchContentChange}
                onClick={resetFilter}
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

            <InfiniteScroll
                loadMore={() => {
                    fetchNextPage({ pageParam: courseQueryParams() });
                    page.current++;
                }}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
            >
                <CourseList>
                    {data?.pages.map((page, pageIdx) =>
                        page.map((card, idx) => <CourseCard data={card} key={`${pageIdx}_${idx}`} />),
                    )}
                </CourseList>
            </InfiniteScroll>

            <PlusButton to="/course/new"></PlusButton>
        </>
    );
};

export default Courses;
