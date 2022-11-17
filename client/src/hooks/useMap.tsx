import ZoomControl from "#components/Map/ZoomControl/ZoomControl";
import { LatLng } from "#types/LatLng";
import { useCallback, useEffect, useRef } from "react";

interface MapProps {
    height?: string;
    /**
     * 지도 중심 좌표
     */
    center: LatLng;
    /**
     * 지도 zoom 단계
     * 숫자가 작을수록 zoom-in
     */
    level?: number;
}

const useMap = ({ height = "100vh", center, level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
    }, []);

    const zoomIn = useCallback(() => {
        if (!map.current) return;
        map.current.setLevel(map.current.getLevel() - 1, { animate: true });
    }, []);

    const zoomOut = useCallback(() => {
        if (!map.current) return;
        map.current.setLevel(map.current.getLevel() + 1, { animate: true });
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
