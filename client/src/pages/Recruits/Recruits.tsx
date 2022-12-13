import React, { Suspense, useState } from "react";
import Header from "#components/Header/Header";
import SearchBar from "#components/SearchBar/SearchBar";
import FilterBar from "#components/FilterBar/FilterBar";
import SelectFilter from "#components/SelectFilter/SelectFilter";
import useFilter from "#hooks/useFilter";
import OnOffFilter from "#components/OnOffFilter/OnOffFilter";
import useOnOffFilter from "#hooks/useOnOffFilter";
import { PLACEHOLDER } from "#constants/placeholder";
import { LOCATION_ICON, CLOCK_ICON } from "#assets/icons";
import PlusButton from "#components/PlusButton/PlusButton";
import RecruitList from "#components/CardList/RecruitList/RecruitList";
import CardListLoader from "#components/CardList/CardList.loader";

const Recruits = () => {
    const [currentDistanceFilter, setCurrentDistanceFilter] = useFilter({ text: "3-5KM", min: 3, max: 5 });
    const [currentTimeFilter, setCurrentTimeFilter] = useFilter({ text: "3시간 이내", min: 0, max: 3 });
    const [titleFilter, toggleTitleFilter] = useOnOffFilter(false);
    const [authorFilter, toggleAuthorFilter] = useOnOffFilter(false);
    const [availFilter, toggleAvailFilter] = useOnOffFilter(false);
    const [searchContent, setSearchContent] = useState("");

    const handleSearchContentChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchContent(e.currentTarget.value);
    };

    return (
        <>
            <Header text="모집 목록" />
            <SearchBar
                placeholder={PLACEHOLDER.SEARCH}
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
            <Suspense fallback={<CardListLoader />}>
                <RecruitList
                    distance={currentDistanceFilter}
                    time={currentTimeFilter}
                    query={searchContent}
                    authorFilter={authorFilter}
                    titleFilter={titleFilter}
                    availFilter={availFilter}
                />
                <PlusButton to="/courses"></PlusButton>
            </Suspense>
        </>
    );
};
export default Recruits;
