import React, { useState, useRef, useEffect } from "react";
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
import { LOCATION_ICON, CLOCK_ICON } from "#assets/icons";
import RecruitCard from "#components/Card/RecruitCard/RecruitCard";
import { Recruit } from "#types/Recruit";

const RecruitList = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Recruits = () => {
    const { get } = useGet();
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({ text: "3-5KM", min: 3, max: 5 });
    const [currentTimeFilter, setCurrentTimeFilter] = useFilter({ text: "3시간 이내", min: 0, max: 3 });

    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);
    const [availFilter, toggleAvailFilter] = useOnOffFilter(false);

    const [cardList, setCardList] = useState<Recruit[]>([]);
    const [searchContent, setSearchContent] = useState("");
    const handleSearchContentChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchContent(e.currentTarget.value);
    };

    const page = useRef(1);

    const incrementPage = () => {
        page.current++;
    };

    const [hasMore, setHasMore] = useState(true);

    const recruitQueryParams = () => {
        const param: any = {};
        if (titleFilter) param.title = "true";
        if (authorFilter) param.author = "true";
        if (availFilter) param.avail = "true";
        if (searchContent !== "") param.query = searchContent;
        param.maxLen = (currentDistanceFilter.max * 1000).toString();
        param.minLen = (currentDistanceFilter.min * 1000).toString();
        param.time = currentTimeFilter.max.toString();
        param.page = page.current.toString();

        return param;
    };

    const sendRecruitFetchRequest = async () => {
        const response: any = await get("/recruit", recruitQueryParams());
        if (response.data.length == 0) setHasMore(false);
        setCardList((prev) => [...prev, ...response.data]);
        incrementPage();
    };

    const resetSearchResultCards = () => {
        page.current = 1;
        setCardList([]);
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
                    resetSearchResultCards();
                    sendRecruitFetchRequest();
                }}
                content={searchContent}
                onChange={handleSearchContentChange}
            ></SearchBar>
            <FilterBar>
                <OnOffFilter
                    filterState={availFilter}
                    filterName="참여 가능"
                    toggleFilterState={toggleAvailFilter}
                ></OnOffFilter>
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
                <SelectFilter
                    filterIcon={CLOCK_ICON}
                    filterState={currentTimeFilter}
                    filterOptions={[
                        { text: "5시간 이내", min: 0, max: 5 },
                        { text: "3시간 이내", min: 0, max: 3 },
                        { text: "1시간 이내", min: 0, max: 1 },
                    ]}
                    filterDescription="달리기를 시작할 시간을 선택해주세요"
                    setCurrentFilterState={setCurrentTimeFilter}
                ></SelectFilter>
            </FilterBar>
            <InfiniteScroll
                dataLength={cardList.length}
                next={() => {
                    if (!hasMore) return;
                    sendRecruitFetchRequest();
                }}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <RecruitList>
                    {cardList.map((card, i) => (
                        <RecruitCard data={card} key={i}></RecruitCard>
                    ))}
                </RecruitList>
            </InfiniteScroll>
        </>
    );
};
export default Recruits;
