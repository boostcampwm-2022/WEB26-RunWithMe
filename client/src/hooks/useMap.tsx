import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { MapProps } from "#types/MapProps";
import { useEffect, useRef } from "react";
import useZoomControl from "./useZoomControl";

const useMap = ({ height = "100vh", center, level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const { zoomIn, zoomOut } = useZoomControl(map);
    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
    }, []);

    return {
        map: map.current,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
            </div>
        ),
    };
};

export default useMap;
