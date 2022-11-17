// 참고: https://github.com/JaeSeoKim/kakao.maps.d.ts
declare namespace kakao.maps {
    export class Map implements kakao.maps.event.EventTarget {
        constructor(container: HTMLElement | JSX.Element, options: MapOptions);
        public setCenter(latlng: LatLng | Coords): void;
        public getCenter(): LatLng;
        public setLevel(
            level: number,
            options?: {
                animate?:
                    | boolean
                    | {
                          duration: number;
                      };
                anchor?: LatLng;
            },
        ): void;
        public getLevel(): number;
        public setMapTypeId(mapTypeId: MapTypeId): void;
        public getMapTypeId(): MapTypeId;
        public setBounds(
            bounds: LatLngBounds,
            paddingTop?: number,
            paddingRight?: number,
            paddingBottom?: number,
            paddingLeft?: number,
        ): void;
        public getBounds(): LatLngBounds;
        public setMinLevel(minLevel: number): void;
        public setMaxLevel(maxLevel: number): void;
        public panBy(dx: number, dy: number): void;
        public panTo(latlng_or_bounds: LatLng | LatLngBounds | Coords, padding?: number): void;
        public addControl(
            control: MapTypeControl | ZoomControl | kakao.maps.drawing.ToolboxElement,
            position: ControlPosition,
        ): void;
        public removeControl(control: MapTypeControl | ZoomControl | kakao.maps.drawing.ToolboxElement): void;
        public setDraggable(draggable: boolean): void;
        public getDraggable(): boolean;
        public setZoomable(zoomable: boolean): void;
        public getZoomable(): boolean;
        public setProjectionId(projectionId: ProjectionId): void;
        public getProjectionId(): ProjectionId;
        public relayout(): void;
        public addOverlayMapTypeId(mapTypeId: MapTypeId): void;
        public removeOverlayMapTypeId(mapTypeId: MapTypeId): void;
        public setKeyboardShortcuts(active: boolean): void;
        public getKeyboardShortcuts(): boolean;
        public setCopyrightPosition(copyrightPosition: CopyrightPosition, reversed?: boolean): void;
        public getProjection(): MapProjection;
        public setCursor(style: string): void;
        public getNode(): HTMLElement;
    }

    export interface MapOptions {
        center: LatLng | Coords;
        level?: number;
        mapTypeId?: MapTypeId;
        draggable?: boolean;
        scrollwheel?: boolean;
        disableDoubleClick?: boolean;
        disableDoubleClickZoom?: boolean;
        projectionId?: ProjectionId;
        tileAnimation?: boolean;
        keyboardShortcuts?:
            | boolean
            | {
                  speed: number;
              };
    }
}
