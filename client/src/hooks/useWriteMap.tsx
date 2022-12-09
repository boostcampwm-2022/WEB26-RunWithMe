import LockButton from "#components/MapControl/LockButton/LockButton";
import MapTypeControl from "#components/MapControl/MapTypeControl/MapTypeControl";
import MyPositionButton from "#components/MapControl/MyPositionButton/MyPositionButton";
import PlaceSearch from "#components/MapControl/PlaceSearch/PlaceSearch";
import UndoButton from "#components/MapControl/UndoButton/UndoButton";
import ZoomControl from "#components/MapControl/ZoomControl/ZoomControl";
import { JEJU } from "#constants/location";
import { MapProps } from "#types/MapProps";
import { createMap, createPolyline, getLaMaByLatLng } from "#utils/mapUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import useGeoLocationQuery from "./queries/useGeoLocationQuery";
import useDrawCurve from "./useDrawCurve";
import useMapTypeControl from "./useMapTypeControl";
import useMarker from "./useMarker";
import useZoomControl from "./useZoomControl";

const useWriteMap = ({ height = "100vh" }: MapProps) => {
    const container = useRef<HTMLDivElement>(null);
    const map = useRef<kakao.maps.Map>();
    const polyLineRef = useRef<kakao.maps.Polyline>();
    const [path, setPath] = useState<(kakao.maps.LatLng | kakao.maps.LatLng[])[]>([]);
    const [isMapDraggable, setIsMapDraggable] = useState(true);
    const [pathLength, setPathLength] = useState(0);
    const { zoomIn, zoomOut } = useZoomControl(map);
    const { mapType, onClickRoadMap, onClickSkyView } = useMapTypeControl(map);
    const { drawMarker, initMarker } = useMarker();
    const { setDrawCurveEnabled } = useDrawCurve({ container, map, setPath });
    const { data: geoLocation } = useGeoLocationQuery();

    const getExpandedPath = useCallback(() => {
        return path.reduce<kakao.maps.LatLng[]>((acc, cur) => {
            if (Array.isArray(cur)) return [...acc, ...cur];
            return [...acc, cur];
        }, []);
    }, [path]);

    const updatePath = useCallback(() => {
        if (!polyLineRef.current) return;
        setPathLength(polyLineRef.current?.getLength());
        const _path = getExpandedPath();
        polyLineRef.current.setPath(_path);
        drawMarker(_path);
    }, []);

    const onClickMap = useCallback(
        (mouseEvent: kakao.maps.event.MouseEvent) => {
            if (!polyLineRef.current) return;
            setPath((prev) => [...prev, mouseEvent.latLng]);
        },
        [polyLineRef],
    );

    const onClickUndo = useCallback(() => {
        if (!polyLineRef.current) return;
        const _path = [...path];
        _path.pop();
        setPath(_path);
    }, [path]);

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
        if (!map.current) return new kakao.maps.LatLng(JEJU.lat, JEJU.lng);
        return map.current.getCenter();
    }, []);

    const onClickMyPositionButton = useCallback(() => {
        if (!geoLocation || !map.current) return;
        map.current.setCenter(getLaMaByLatLng(geoLocation));
    }, [map]);

    const render = useCallback(
        () => (
            <div style={{ position: "relative" }}>
                <div ref={container} style={{ width: "100%", height }} />
                <ZoomControl onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
                <UndoButton onClick={onClickUndo} />
                <LockButton isLocked={!isMapDraggable} onClick={onClickLock} />
                <PlaceSearch setCenter={setCenter} getCenter={getCenter} />
                <MapTypeControl onClickRoadMap={onClickRoadMap} onClickSkyView={onClickSkyView} mapType={mapType} />
                <MyPositionButton onClick={onClickMyPositionButton} />
            </div>
        ),
        [],
    );

    useEffect(() => {
        if (!geoLocation || !container.current) return;
        map.current = createMap(container.current, geoLocation);
        polyLineRef.current = createPolyline(map.current);
        kakao.maps.event.addListener(map.current, "click", onClickMap);
        initMarker(map.current);
    }, [geoLocation]);

    useEffect(updatePath, [path]);

    useEffect(() => {
        if (!map.current || !container.current) return;
        setDrawCurveEnabled(isMapDraggable);
    }, [isMapDraggable]);

    return {
        getPath: getExpandedPath,
        pathLength,
        WriteMap: render,
    };
};

export default useWriteMap;
