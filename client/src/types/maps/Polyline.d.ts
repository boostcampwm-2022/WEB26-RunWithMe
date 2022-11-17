declare namespace kakao.maps {
    export class Polyline implements kakao.maps.event.EventTarget {
        constructor(options: PolylineOptions);
        public setPath(path: LatLng[] | LatLng[][]): void;
        public getPath(): LatLng[];
        public getLength(): number;
        public setZIndex(zIndex: number): void;
        public getZIndex(): number;
        public setMap(map: Map | null): void;
    }

    export interface setPolylineOptions extends PolylineOptions {
        path?: LatLng[];
    }

    export interface PolylineOptions {
        map?: Map;
        endArrow?: boolean;
        path: LatLng[];
        strokeWeight?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeStyle?: StrokeStyles;
        zIndex?: number;
    }
}
