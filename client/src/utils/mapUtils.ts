import { JEJU } from "#constants/location";
import { LatLng } from "#types/LatLng";

export const getLaMaByLatLng = (point: LatLng): kakao.maps.LatLng => {
    return new kakao.maps.LatLng(point.lat, point.lng);
};

export const createMap = (
    container: HTMLElement,
    center?: LatLng,
    options?: { level?: number; disableControl: boolean },
) => {
    const map = new kakao.maps.Map(container, {
        center: center ? getLaMaByLatLng(center) : new kakao.maps.LatLng(JEJU.lat, JEJU.lng),
        level: options?.level,
    });
    if (options?.disableControl) {
        map.setZoomable(false);
        map.setDraggable(false);
    }
    return map;
};

export const createPolyline = (map: kakao.maps.Map, path?: LatLng[]) =>
    new kakao.maps.Polyline({
        map: map,
        path: path ? path.map(getLaMaByLatLng) : [],
    });

export const setBoundary = (map: kakao.maps.Map, path: LatLng[]) => {
    map.setBounds(getBoundary(path));
};

export const getBoundary = (path: LatLng[]) => {
    const pathBounds = getBounds(path);
    const sw = new kakao.maps.LatLng(pathBounds.minLat, pathBounds.minLng);
    const ne = new kakao.maps.LatLng(pathBounds.maxLat, pathBounds.maxLng);
    return new kakao.maps.LatLngBounds(sw, ne);
};
const getLatLngByPoint = (point: kakao.maps.LatLng): LatLng => {
    return { lat: point.getLat(), lng: point.getLng() };
};

export const getMiddlePoint = (path: LatLng[]) => {
    const bounds = getBounds(path);
    return { lat: (bounds.minLat + bounds.maxLat) / 2, lng: (bounds.minLng + bounds.maxLng) / 2 };
};

export const getBounds = (path: LatLng[]) => {
    let minLat = 90;
    let maxLat = -90;
    let minLng = 180;
    let maxLng = -180;

    for (const point of path) {
        if (minLat > point.lat) {
            minLat = point.lat;
        }
        if (maxLat < point.lat) {
            maxLat = point.lat;
        }
        if (minLng > point.lng) {
            minLng = point.lng;
        }
        if (maxLng < point.lng) {
            maxLng = point.lng;
        }
    }

    return {
        minLat,
        maxLat,
        minLng,
        maxLng,
    };
};

export default getLatLngByPoint;
