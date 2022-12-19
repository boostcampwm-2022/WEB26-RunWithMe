import { hDong } from "./hDong";
import { LatLng } from "./LatLng";

export interface RecruitDetail {
    title: string;
    startTime: string;
    maxPpl: number;
    currentPpl: number;
    path: LatLng[];
    pathLength: number;
    pace: number;
    hDong: hDong;
    userId: string;
    isParticipating: boolean;
    isAuthor: boolean;
    paused?: number;
}
