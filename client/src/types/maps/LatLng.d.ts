declare namespace kakao.maps {
    export class LatLng {
        constructor(latitude: number, longitude: number);
        public getLat(): number;
        public getLng(): number;
        public equals(latlng: LatLng): boolean;
        public toString(): string;
        public toCoords(): Coords;
    }
}
