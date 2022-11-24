import React, { useState, useEffect } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import useGet from "#hooks/http/useHttpGet";
import axios from "axios";
import RecruitCard from "#components/Card/RecruitCard/RecruitCard";

const DummyCardData = {
    title: "황새울공원 한 바퀴 도는 코스입니다.",
    courseId: 5,
    path: [
        { lat: 126.57091836134346, lng: 33.45090000378721 },
        { lat: 126.57004847387998, lng: 33.450635526049844 },
        { lat: 126.56931524544794, lng: 33.45101165404891 },
        { lat: 126.56932224193068, lng: 33.44959616387136 },
        { lat: 126.5700747443057, lng: 33.449670903389 },
        { lat: 126.570502727405, lng: 33.450123187413496 },
    ],
    pathLength: 3355,
    userId: "gchoi96",
    img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
    hCode: "신림동",
};

const RecruitList = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Recruits = () => {
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter("5km 이내");
    const [currentTimeFilter, setCurrentTimeFilter] = useFilter("5시간 이내");

    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);
    const [availFilter, toggleAvailFilter] = useOnOffFilter(false);

    const [cardList, setCardList] = useState<any[]>([]);
    const [searchContent, setSearchContent] = useState("");
    const handleSearchContentChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchContent(e.currentTarget.value);
    };

    const [page, setPage] = useState(1);

    const { get } = useGet();

    const sendNoFilterRequest = async () => {
        const response = await get("/recruit", {
            page: page,
        });
        // response.forEach((elem: any) => (elem.course.img = "https://loremflickr.com/640/480/abstract"));
        setCardList(cardList.concat(response));
    };

    const sendRequest = async () => {
        const maxLen = Number(currentDistanceFilter[0]);
        const time = Number(currentTimeFilter[0]);
        let minLen = maxLen - 2;
        if (maxLen === 1) minLen = 0;
        console.log(searchContent, maxLen * 1000, minLen * 1000, titleFilter.toString());

        const response = await get("/recruit", {
            query: searchContent,
            page: page,
            maxLen: (maxLen * 1000).toString(),
            minLen: (minLen * 1000).toString(),
            time: time.toString(),
        });

        setCardList(cardList.concat(response));
        console.log(response.data);
    };
    //fake API for infinite scroll
    const fetchNextData = () => {
        setTimeout(() => {
            setCardList(cardList.concat(Array<any>(5).fill(DummyCardData)));
        }, 2000);
    };

    useEffect(() => {
        sendNoFilterRequest();
    }, []);

    return (
        <>
            <Header text="모집 목록" />
            <SearchBar
                placeholder={PLACEHOLDER.SEARCH}
                onClick={sendRequest}
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
                    filterState={currentDistanceFilter}
                    filterOptions={["5km 이내", "3km 이내", "1km 이내"]}
                    filterDescription="달리려는 총 거리를 선택해주세요"
                    setCurrentFilterState={setCurrentDistanceFilter}
                ></SelectFilter>
                <SelectFilter
                    filterState={currentTimeFilter}
                    filterOptions={["5시간 이내", "3시간 이내", "1시간 이내"]}
                    filterDescription="달리기를 시작할 시간을 선택해주세요"
                    setCurrentFilterState={setCurrentTimeFilter}
                ></SelectFilter>
            </FilterBar>
            <InfiniteScroll
                dataLength={cardList.length}
                next={() => {
                    fetchNextData();
                }}
                hasMore={true}
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
