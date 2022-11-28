import React, { useState, useEffect } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import useGet from "#hooks/http/useHttpGet";
import { LOCATION_ICON } from "#assets/icons";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import { Course } from "#types/Course";

const CourseList = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Courses = () => {
    const { get } = useGet();
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({ text: "3-5KM", min: 3, max: 5 });

    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);

    const [cardList, setCardList] = useState<Course[]>([]);
    const [searchContent, setSearchContent] = useState("");
    const handleSearchContentChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchContent(e.currentTarget.value);
    };
    let shouldGetNextPage = true;
    const [page, setPage] = useState(1);

    const incrementPage = () => {
        setPage(page + 1);
    };

    const courseQueryParams = () => {
        const param: any = {};
        if (titleFilter) param.title = "true";
        if (authorFilter) param.author = "true";
        if (searchContent !== "") param.query = searchContent;
        param.maxLen = (currentDistanceFilter.max * 1000).toString();
        param.minLen = (currentDistanceFilter.min * 1000).toString();
        param.page = page.toString();
        return param;
    };

    const sendRecruitFetchRequest = async () => {
        const response = await get("/course", courseQueryParams());
        if (response.data.length == 0) shouldGetNextPage = false;
        setCardList((prev) => [...prev, ...response.data]);
        incrementPage();
        console.log(response.data.length, cardList.length);
    };

    useEffect(() => {
        sendRecruitFetchRequest();
    }, []);

    return (
        <>
            <Header text="모집 목록" />
            <SearchBar
                placeholder={PLACEHOLDER.SEARCH}
                onClick={() => {
                    setPage(1);
                    setCardList([]);
                    sendRecruitFetchRequest();
                }}
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
            <InfiniteScroll
                dataLength={cardList.length}
                next={() => {
                    if (!shouldGetNextPage) return;
                    sendRecruitFetchRequest();
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <CourseList>
                    {cardList.map((card, i) => (
                        <CourseCard data={card} key={i}></CourseCard>
                    ))}
                </CourseList>
            </InfiniteScroll>
        </>
    );
};
export default Courses;
