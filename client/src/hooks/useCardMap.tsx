import { LatLng } from "#types/LatLng";
import { MapProps } from "#types/MapProps";
import { getBounds, getMiddlePoint } from "#utils/pathUtils";
import { useCallback, useEffect, useRef, useState } from "react";

const useCardMap = ({ height = "50vh", runningPath }: Pick<MapProps, "runningPath" | "height">) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path] = useState<kakao.maps.LatLng[]>([]);

    useEffect(() => {
        if (!container.current) return;
        if (!runningPath) return;

        map.current = new kakao.maps.Map(container.current, {
            center: getMiddlePoint(runningPath || []),
        });

        polyLineRef.current = new kakao.maps.Polyline({
            map: map.current,
            path,
        });
        map.current.setZoomable(false);
        map.current.setDraggable(false);
        drawPath(runningPath);
        const pathBounds = getBounds(runningPath || []);
        const sw = new kakao.maps.LatLng(pathBounds.minLat, pathBounds.minLng);
        const ne = new kakao.maps.LatLng(pathBounds.maxLat, pathBounds.maxLng);
        const mapBounds = new kakao.maps.LatLngBounds(sw, ne);
        map.current.setBounds(mapBounds);
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
        path,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
            </div>
        ),
    };
};

export default useCardMap;
