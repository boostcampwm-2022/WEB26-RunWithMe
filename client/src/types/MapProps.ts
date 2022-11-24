import { LatLng } from "./LatLng";

export interface MapProps {
    height?: string;
    /**
     * 지도 중심 좌표
     */
    center: LatLng;
    /**
     * 지도 zoom 단계
     * 숫자가 작을수록 zoom-in
     */
    level?: number;
    runningPath?: { lat: number; lng: number }[];
}
