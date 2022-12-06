import { LatLng } from "#types/LatLng";

const getLatLngByPoint = (point: kakao.maps.LatLng): LatLng => {
    return { lat: point.getLat(), lng: point.getLng() };
};

export const getMiddlePoint = (path: { lat: number; lng: number }[]) => {
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
    return { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 };
};

export default getLatLngByPoint;
