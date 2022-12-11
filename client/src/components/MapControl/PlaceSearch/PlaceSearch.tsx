import { SEARCH_ICON } from "#assets/icons";
import usePlaceSearch from "#hooks/usePlaceSearch";
import { MapControlProps } from "#types/MapControlProps";
import { PlaceInfo } from "#types/Place";
import { debounce } from "#utils/timerUtils";
import { ChangeEvent, useCallback, useRef } from "react";
import { PlaceList, SearchContainer, SearchWrapper } from "./PlaceSearch.styles";
interface PlaceSearchProps extends MapControlProps {
    setCenter: (position: kakao.maps.LatLng) => void;
    getCenter: () => kakao.maps.LatLng;
}

const PlaceSearch = ({ position = { top: "14px" }, setCenter, getCenter }: PlaceSearchProps) => {
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
                    <img width="14" height="14" alt="SEARCH_ICON" src={SEARCH_ICON} />
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
