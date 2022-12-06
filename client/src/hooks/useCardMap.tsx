import { LatLng } from "#types/LatLng";
import { MapProps } from "#types/MapProps";
import { getBounds, getMiddlePoint } from "#utils/pathUtils";
import { useCallback, useEffect, useRef } from "react";
import useMarker from "./useMarker";

const useCardMap = ({ runningPath }: Pick<MapProps, "runningPath">) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const { initMarker, drawMarker } = useMarker(36);
    useEffect(() => {
        if (!container.current || !runningPath) return;
        const { lat, lng } = getMiddlePoint(runningPath);
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(lat, lng),
        });

        polyLineRef.current = new kakao.maps.Polyline({
            map: map.current,
            path: runningPath.map(getLaMaByLatLng),
        });
        map.current.setZoomable(false);
        map.current.setDraggable(false);
        drawPath(runningPath);
        const pathBounds = getBounds(runningPath || []);
        const sw = new kakao.maps.LatLng(pathBounds.minLat, pathBounds.minLng);
        const ne = new kakao.maps.LatLng(pathBounds.maxLat, pathBounds.maxLng);
        const mapBounds = new kakao.maps.LatLngBounds(sw, ne);
        map.current.setBounds(mapBounds);
        initMarker(map.current);
        drawMarker(runningPath.map(getLaMaByLatLng));
    }, [runningPath, map]);

    const getLaMaByLatLng = (point: LatLng): kakao.maps.LatLng => {
        return new kakao.maps.LatLng(point.lat, point.lng);
    };

    const drawPath = useCallback(
        async (path: LatLng[] | undefined) => {
            if (!path) {
                return;
            }
            if (!polyLineRef.current) return;
            polyLineRef.current.setPath(path.map((point) => getLaMaByLatLng(point)));
        },
        [polyLineRef],
    );

    return {
        map: map.current,
        path: runningPath?.map(getLaMaByLatLng),
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100%", aspectRatio: `16 / 9` }} />
            </div>
        ),
    };
};

export default useCardMap;
