declare namespace kakao.maps {
    export class Marker implements kakao.maps.event.EventTarget {
        constructor(options: MarkerOptions);
        public setMap(map: Map | Roadview | null): void;
        public getMap(): Map;
        public setPosition(position: LatLng | Viewpoint): void;
        public getPosition(): LatLng;
        public setZIndex(zIndex: number): void;
        public getZIndex(): number;
        public setVisible(visible: boolean): void;
        public getVisible(): boolean;
        public setTitle(title: string): void;
    }

    export interface MarkerOptions {
        map?: Map | Roadview | Roadview;
        position: LatLng | Viewpoint;
        image?: MarkerImage;
        title?: string;
        draggable?: boolean;
        clickable?: boolean;
        zIndex?: number;
        opacity?: number;
    }
}
