import { LOCAL_API_PATH } from "#types/LocalAPIType";
import { PlaceInfo } from "#types/Place";
import { useCallback, useState } from "react";
import useLocalAPI from "./useLocalAPI";

const usePlaceSearch = () => {
    const [searchResult, setSearchResult] = useState<PlaceInfo[]>([]);
    const getPlaceList = useLocalAPI(LOCAL_API_PATH.PLACE, {
        page: 1,
        size: 7,
        sort: "accuracy",
    });
    const search = useCallback((query: string, center: kakao.maps.LatLng) => {
        if (!query) {
            setSearchResult([]);
            return;
        }
        getPlaceList({ query, x: center.getLng(), y: center.getLat() }).then((res: any) => {
            setSearchResult(res.documents);
        });
    }, []);

    const clear = useCallback(() => {
        setSearchResult([]);
    }, []);

    return { searchResult, search, clear };
};

export default usePlaceSearch;
