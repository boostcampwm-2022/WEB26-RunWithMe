import { LatLng } from "#types/LatLng";

const getLatLngByPoint = (point: kakao.maps.LatLng): LatLng => {
    return { lat: point.getLat(), lng: point.getLng() };
};

export default getLatLngByPoint;
