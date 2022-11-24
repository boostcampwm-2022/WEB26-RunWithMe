import React, { useState, useEffect } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import { CLOCK_ICON, LOCATION_ICON } from "#assets/icons";

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

const Courses = () => {
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter("5km 이내");
    const [currentTimeFilter, setCurrentTimeFilter] = useFilter("5시간 이내");

    const [titleFilter, toggleTitleFilter] = useOnOffFilter(true);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(true);
    const [contentFilter, toggleContentFilter] = useOnOffFilter(true);
    const [availFilter, toggleAvailFilter] = useOnOffFilter(true);

    const [cardList, setCardList] = useState<any[]>([]);

    const sendRequest = () => {
        const params = new URLSearchParams({
            dist: "5",
            maxLen: "3000",
            minLen: "1000",
            page: "1",
            title: "true",
            author: "true",
        });
        console.log(params.toString());
    };

    //fake API for infinite scroll
    const fetchNextData = () => {
        setTimeout(() => {
            setCardList(cardList.concat(Array<any>(5).fill(DummyCardData)));
        }, 2000);
    };

    useEffect(() => {
        fetchNextData();
        sendRequest();
    }, []);

    return (
        <>
            <Header text="코스 목록" />
            <SearchBar placeholder={PLACEHOLDER.SEARCH}></SearchBar>
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
                <OnOffFilter
                    filterState={contentFilter}
                    filterName="내용"
                    toggleFilterState={toggleContentFilter}
                ></OnOffFilter>
                <SelectFilter
                    filterIcon={LOCATION_ICON}
                    filterState={currentDistanceFilter}
                    filterOptions={["5km 이내", "3km 이내", "1km 이내"]}
                    filterDescription="달리려는 총 거리를 선택해주세요"
                    setCurrentFilterState={setCurrentDistanceFilter}
                ></SelectFilter>
                <SelectFilter
                    filterIcon={CLOCK_ICON}
                    filterState={currentTimeFilter}
                    filterOptions={["5시간 이내", "3시간 이내", "1시간 이내"]}
                    filterDescription="달리기를 시작할 시간을 선택해주세요"
                    setCurrentFilterState={setCurrentTimeFilter}
                ></SelectFilter>
            </FilterBar>
        </>
    );
};
export default Courses;
