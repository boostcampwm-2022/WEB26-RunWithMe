import { SEARCH_ICON } from "#assets/icons";
import usePlaceSearch from "#hooks/usePlaceSearch";
import { LocalData } from "#types/Local";
import { MapControlPotition, MapControlProps } from "#types/MapControlProps";
import { PlaceInfo } from "#types/Place";
import { debounce } from "#utils/timerUtils";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn, flexRowCenter, flexRowSpaceBetween } from "styles/flex";
import { fontMidium } from "styles/font";

const SearchBarItemStyle = css`
    background: ${COLOR.WHITE};
    opacity: 0.9;
    border-radius: 10px;
    padding: 4px 8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

const SearchContainer = styled.div<{ position: MapControlPotition }>`
    ${flexColumn}
    align-items: center;
    position: absolute;
    width: 100%;
    z-index: 1;
    top: ${({ position }) => position.top ?? "auto"};
    left: ${({ position }) => position.left ?? "auto"};
    bottom: ${({ position }) => position.bottom ?? "auto"};
    right: ${({ position }) => position.right ?? "auto"};
`;

const SearchWrapper = styled.div`
    ${flexRowCenter};
    width: 100%;
    div {
        ${flexRowSpaceBetween};
        ${SearchBarItemStyle};
    }
    input {
        ${fontMidium(COLOR.DARK_GRAY, 500)}
        border: none;
        :focus {
            outline: none;
        }
    }
    margin-bottom: 4px;
`;

const PlaceList = styled.ul`
    ${SearchBarItemStyle};
    background-color: ${COLOR.WHITE};
    width: 200px;
    align-items: center;
    li {
        ${fontMidium(COLOR.DARK_GRAY, 500)};
        margin: 2px 0;
        list-style-type: none;
    }
`;

interface PlaceSearchProps extends MapControlProps {
    setCenter: (position: kakao.maps.LatLng) => void;
    getCenter: () => kakao.maps.LatLng;
}

const PlaceSearch = ({ position, setCenter, getCenter }: PlaceSearchProps) => {
    const { searchResult, search, clear } = usePlaceSearch();
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeQuery = debounce((e: ChangeEvent<HTMLInputElement>) => search(e.target.value, getCenter()), 200);

    const onClickPlace = useCallback(
        (place: PlaceInfo) => () => {
            if (!inputRef.current) return;
            const { x, y } = place;
            setCenter(new kakao.maps.LatLng(Number(y), Number(x)));
            inputRef.current.value = "";
            clear();
        },
        [],
    );

    return (
        <SearchContainer position={position}>
            <SearchWrapper>
                <div>
                    <input ref={inputRef} onChange={onChangeQuery} placeholder="장소, 주소, 버스 검색" />
                    <img src={SEARCH_ICON} />
                </div>
            </SearchWrapper>
            {searchResult.length > 0 && (
                <PlaceList>
                    {searchResult.map((place, idx) => (
                        <li key={idx} onClick={onClickPlace(place)}>
                            {place.place_name}
                        </li>
                    ))}
                </PlaceList>
            )}
        </SearchContainer>
    );
};
export default PlaceSearch;
