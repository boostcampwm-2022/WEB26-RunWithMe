import LockButton from "#components/MapControl/LockButton/LockButton";
import PlaceSearch from "#components/MapControl/PlaceSearch/PlaceSearch";
import UndoButton from "#components/MapControl/UndoButton/UndoButton";
import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { MapProps } from "#types/MapProps";
import { useCallback, useEffect, useRef, useState } from "react";
import useZoomControl from "./useZoomControl";

const useWriteMap = ({ height = "100vh", center, level = 1 }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const { current: roadviewClient } = useRef<kakao.maps.RoadviewClient>(new kakao.maps.RoadviewClient());
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path, setPath] = useState<kakao.maps.LatLng[]>([]);
    const [isMapDraggable, setIsMapDraggable] = useState(true);
    const [pathLength, setPathLength] = useState(0);
    const { zoomIn, zoomOut } = useZoomControl(map);

    const checkIsRoad = (position: kakao.maps.LatLng) => {
        return new Promise((resolve) =>
            roadviewClient.getNearestPanoId(position, 10, (panoId: any) => {
                resolve(!!panoId);
            }),
        );
    };

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
        kakao.maps.event.addListener(map.current, "click", onClickMap);
    }, []);

    useEffect(() => {
        if (!polyLineRef.current) return;
        setPathLength(polyLineRef.current?.getLength());
    }, [path]);

    const onClickMap = useCallback(
        async (mouseEvent: kakao.maps.event.MouseEvent) => {
            if (!polyLineRef.current) return;
            const position = mouseEvent.latLng;
            const isRoad = await checkIsRoad(position);
            if (isRoad) {
                const newPath = [...polyLineRef.current.getPath(), position];
                setPath(newPath);
                polyLineRef.current.setPath(newPath);
            }
        },
        [polyLineRef],
    );

    const onClickUndo = useCallback(() => {
        if (!polyLineRef.current) return;
        const _path = polyLineRef.current.getPath().slice(0, -1);
        setPath(_path);
        polyLineRef.current.setPath(_path);
    }, []);

    const onClickLock = useCallback(() => {
        if (!map.current) return;
        map.current.setDraggable(!map.current.getDraggable());
        setIsMapDraggable((prev) => !prev);
    }, [map]);

    const setCenter = useCallback(
        (position: kakao.maps.LatLng) => {
            if (!map.current) return;
            map.current.setCenter(position);
        },
        [map.current],
    );

    const getCenter = useCallback(() => {
        if (!map.current) return;
        return map.current.getCenter();
    }, [map.current]);

    return {
        map: map.current,
        path,
        pathLength,
        renderMap: () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100vw", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
                <UndoButton onClick={onClickUndo} position={{ bottom: "14px", right: "14px" }} />
                <LockButton
                    isLocked={!isMapDraggable}
                    onClick={onClickLock}
                    position={{ top: "96px", right: "14px" }}
                />
                <PlaceSearch position={{ top: "14px" }} setCenter={setCenter} />
            </div>
        ),
    };
};

export default useWriteMap;
