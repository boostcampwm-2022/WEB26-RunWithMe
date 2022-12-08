import { hDong } from "./hDong";

export interface Profile {
    userId: string;
    hDong: hDong;
    pace?: number;
}
