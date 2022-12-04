declare namespace kakao.maps {
    export class MarkerImage {
        constructor(src: string, size: Size, options?: MarkerImageOptions);
    }

    export interface MarkerImageOptions {
        alt?: string;
        offset?: Point;
    }
}
