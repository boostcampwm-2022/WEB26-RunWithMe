import { ARRIVE_ICON, START_ICON } from "#assets/icons";
import { useCallback, useRef } from "react";

const useMarker = (size = 48) => {
    const { current: startMarker } = useRef<kakao.maps.Marker>(
        new kakao.maps.Marker({
            position: new kakao.maps.LatLng(33, 127),
            image: new kakao.maps.MarkerImage(START_ICON, new kakao.maps.Size(size, size)),
        }),
    );
    const { current: arriveMarker } = useRef<kakao.maps.Marker>(
        new kakao.maps.Marker({
            position: new kakao.maps.LatLng(33, 127),
            image: new kakao.maps.MarkerImage(ARRIVE_ICON, new kakao.maps.Size(size, size)),
        }),
    );

    const initMarker = useCallback((map: kakao.maps.Map) => {
        startMarker.setMap(map);
        startMarker.setVisible(false);
        arriveMarker.setMap(map);
        arriveMarker.setVisible(false);
    }, []);

    const drawMarker = useCallback((path: kakao.maps.LatLng[]) => {
        if (!startMarker.getMap()) return;
        startMarker.setPosition(path[0] || new kakao.maps.LatLng(33, 127));
        startMarker.setVisible(path.length > 0);
        arriveMarker.setPosition(path.at(-1) || new kakao.maps.LatLng(33, 127));
        arriveMarker.setVisible(path.length > 1);
    }, []);

    return { initMarker, drawMarker };
};

export default useMarker;
