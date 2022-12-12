import { LatLng } from "#types/LatLng";

export interface PostCourseBody {
    title: string;
    path: LatLng[];
    pathLength: number;
    hCode: string;
}
