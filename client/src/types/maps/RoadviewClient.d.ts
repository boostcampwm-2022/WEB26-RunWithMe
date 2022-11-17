declare namespace kakao.maps {
    export class RoadviewClient {
        constructor();
        getNearestPanoId(position: LatLng, radius: number, callback: (panoId: number) => void): number;
    }
}
