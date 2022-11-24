import { hDong } from "./hDong";

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
