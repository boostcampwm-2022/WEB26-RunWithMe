import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { LatLng } from "#types/LatLng";
import { MapProps } from "#types/MapProps";
import { useCallback, useEffect, useRef, useState } from "react";
import useZoomControl from "./useZoomControl";

const useShowMap = ({ height = "100vh", center, level = 1, runningPath }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path, setPath] = useState<kakao.maps.LatLng[]>([]);
    const { zoomIn, zoomOut } = useZoomControl(map);

    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
        polyLineRef.current = new kakao.maps.Polyline({
            map: map.current,
            path,
        });
        DrawPath(runningPath);
    }, [runningPath]);
    const getLaMaByLatLng = (point: LatLng): kakao.maps.LatLng => {
        return new kakao.maps.LatLng(point.lat, point.lng);
    };
    const DrawPath = useCallback(
        async (path: { lat: number; lng: number }[] | undefined) => {
            if (!path) {
                return;
            }
            if (!polyLineRef.current) return;
            for (const point of path) {
                const position = getLaMaByLatLng(point);
                const newPath = [...polyLineRef.current.getPath(), position];
                setPath(newPath);
                polyLineRef.current.setPath(newPath);
            }
        },
        [polyLineRef],
    );

    return {
        map: map.current,
        path,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
            </div>
        ),
    };
};

export default useShowMap;
