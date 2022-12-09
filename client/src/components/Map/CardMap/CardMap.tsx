import { LatLng } from "#types/LatLng";
import { createMap, createPolyline, getLaMaByLatLng, getMiddlePoint, setBoundary } from "#utils/mapUtils";
import { useEffect, useRef } from "react";
import useMarker from "../../../hooks/useMarker";

interface CardMapProps {
    path: LatLng[];
}

const CardMap = ({ path }: CardMapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const { initMarker, drawMarker } = useMarker(36);
    useEffect(() => {
        if (!container.current || !path) return;
        map.current = createMap(container.current, getMiddlePoint(path), { disableControl: true });
        polyLineRef.current = createPolyline(map.current, path);
        setBoundary(map.current, path);
        initMarker(map.current);
        drawMarker(path.map(getLaMaByLatLng));
    }, [path, map]);

    return (
        <div style={{ position: "relative" }}>
            <div ref={container} style={{ width: "100%", aspectRatio: `16 / 9` }} />
        </div>
    );
};

export default CardMap;
