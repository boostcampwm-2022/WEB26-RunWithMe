import { hDong } from "./hDong";
import { LatLng } from "./LatLng";

export interface Course {
    id: number;
    title: string;
    img: string;
    path: string;
    pathLength: number;
    hDong: hDong;
    createdAt: string;
    userId?: string;
}
