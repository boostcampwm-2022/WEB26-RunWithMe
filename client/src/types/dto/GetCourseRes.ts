import { hDong } from "#types/hDong";
import { LatLng } from "#types/LatLng";

interface GetCourseRes {
    title: string;
    pathLength: number;
    hDong: hDong;
    path: LatLng[] | string;
    userId: string;
}

export default GetCourseRes;
