export const getMiddlePoint = (path: { lat: number; lng: number }[]) => {
    const bounds = getBounds(path);
    return { lat: (bounds.minLat + bounds.maxLat) / 2, lng: (bounds.minLng + bounds.maxLng) / 2 };
};

export const getBounds = (path: { lat: number; lng: number }[]) => {
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
