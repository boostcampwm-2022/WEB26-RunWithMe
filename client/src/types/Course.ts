import { LatLng } from "./LatLng";

export interface Course {
    title: string;
    courseId: number;
    path: LatLng[];
    pathLength: number;
    zipCode: string;
    userId: string;
    img: string;
}
