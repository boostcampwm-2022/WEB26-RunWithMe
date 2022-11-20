import LockButton from "#components/MapControl/LockButton/LockButton";
import UndoButton from "#components/MapControl/UndoButton/UndoButton";
import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { LatLng } from "#types/LatLng";
import { useEffect, useRef, useState } from "react";
import useZoomControl from "./useZoomControl";

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

const useWriteMap = ({ height = "100vh", center, level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const { zoomIn, zoomOut } = useZoomControl(map);

    const [path, setPath] = useState<LatLng[]>([]);

    useEffect(() => {
        if (!container.current) return;
        map.current = new kakao.maps.Map(container.current, {
            center: new kakao.maps.LatLng(center.lat, center.lng),
            level,
        });
    }, []);

    return {
        map: map.current,
        path,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
                <UndoButton onClick={console.log} position={{ top: "100px", bottom: "10px" }} />
                <LockButton onClick={console.log} position={{ top: "100px", bottom: "10px" }} />
            </div>
        ),
    };
};

export default useWriteMap;
