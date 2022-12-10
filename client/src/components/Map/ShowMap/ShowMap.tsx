import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { MapProps } from "#types/MapProps";
import { useEffect, useRef } from "react";
import useMarker from "#hooks/useMarker";
import useZoomControl from "#hooks/useZoomControl";
import { createMap, createPolyline, getBoundary, getLaMaByLatLng, getMiddlePoint } from "#utils/mapUtils";
import { LatLng } from "#types/LatLng";

interface ShowMapProps extends MapProps {
    path: LatLng[];
}

const useShowMap = ({ height = "50vh", path }: ShowMapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const { zoomIn, zoomOut } = useZoomControl(map);
    const { initMarker, drawMarker } = useMarker();
    useEffect(() => {
        if (!container.current) return;
        map.current = createMap(container.current, getMiddlePoint(path));
        polyLineRef.current = createPolyline(map.current, path);
        map.current.setBounds(getBoundary(path));
        initMarker(map.current);
        drawMarker(path.map(getLaMaByLatLng));
    }, [path, map]);

    return (
        <div style={{ position: "relative" }}>
            <div ref={container} style={{ width: "100%", height }} />
            <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
        </div>
    );
};

export default useShowMap;
