import { LatLng } from "#types/LatLng";

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
