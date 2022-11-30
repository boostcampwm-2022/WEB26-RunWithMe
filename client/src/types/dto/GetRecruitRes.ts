import { hDong } from "#types/hDong";
import { LatLng } from "#types/LatLng";

interface GetRecruitRes {
    id: number;
    title: string;
    startTime: string;
    maxPpl: number;
    currentPpl: number;
    userId: string;
    pace: number;
    createdAt: string;
    course: {
        id: number;
        title: string;
        img: string;
        path: LatLng[];
        pathLength: number;
        userId: string;
        hDong: hDong;
        createdAt: string;
    };
}

export default GetRecruitRes;
