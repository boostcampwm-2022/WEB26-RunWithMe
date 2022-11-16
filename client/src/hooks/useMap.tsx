import { LatLng } from "#types/LatLng";
import { useEffect, useRef } from "react";

interface MapProps {
    width?: string;
    height?: string;
    center: LatLng;
    level?: number;
}

const useMap = ({ width = "100vw", height = "100vh", center, level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
    }, []);

    return { map: map.current, renderMap: () => <div ref={container} style={{ width, height }}></div> };
};

export default useMap;
