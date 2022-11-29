import { hDong } from "#types/hDong";

interface GetCourseRes {
    title: string;
    pathLength: number;
    hDong: hDong;
    userId: string;
}

export default GetCourseRes;
