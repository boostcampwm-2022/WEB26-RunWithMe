declare namespace kakao.maps.event {
    export class EventTarget {}
    export function addListener(target: EventTarget, type: string, handler: (event: MouseEvent) => void): void;
    export function removeListener(target: EventTarget, type: string, handler: (event: MouseEvent) => void): void;
    export function trigger(target: EventTarget, type: string, data?: any): void;
    export function preventMap(): void;
}
