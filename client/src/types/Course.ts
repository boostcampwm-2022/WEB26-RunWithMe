import { LatLng } from "./LatLng";

export interface Course {
    title: string;
    courseId: number;
    path: LatLng[];
    pathLength: number;
    hCode: string;
    userId: string;
    img: string;
}
