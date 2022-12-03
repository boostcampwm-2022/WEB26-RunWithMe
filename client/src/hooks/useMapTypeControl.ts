import { MutableRefObject, useCallback, useState } from "react";

const useMapTypeControl = (map: MutableRefObject<kakao.maps.Map | undefined>) => {
    const [mapType, setMapType] = useState<kakao.maps.MapTypeId>(kakao.maps.MapTypeId.ROADMAP);
    const onClickSkyView = useCallback(() => {
        if (!map.current) return;
        map.current.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        setMapType(kakao.maps.MapTypeId.HYBRID);
    }, [map]);
    const onClickRoadMap = useCallback(() => {
        if (!map.current) return;
        map.current.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        setMapType(kakao.maps.MapTypeId.ROADMAP);
    }, [map]);
    return {
        mapType,
        onClickSkyView,
        onClickRoadMap,
    };
};

export default useMapTypeControl;
