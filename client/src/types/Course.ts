import { hDong } from "./hDong";
import { LatLng } from "./LatLng";

export interface Course {
    id: number;
    title: string;
    path: LatLng[];
    pathLength: number;
    hDong: hDong;
    createdAt: string;
    userId: string;
}
