import { PlaceInfo, PlaceSearchResponse } from "#types/Place";
import axios from "axios";
import { useCallback, useState } from "react";

const usePlaceSearch = () => {
    const [searchResult, setSearchResult] = useState<PlaceInfo[]>([]);

    const search = useCallback((query: string) => {
        if (!query) {
            setSearchResult([]);
            return;
        }
        const params = { page: 1, size: 7, query, sort: "accuracy" };
        axios
            .get<PlaceSearchResponse>(`${process.env.REACT_APP_PLACE_API_URL}`, {
                params,
                headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
            })
            .then(({ data }) => {
                setSearchResult(data.documents);
            });
    }, []);

    return { searchResult, search };
};

export default usePlaceSearch;
