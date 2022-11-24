import { atom } from "recoil";

interface userState {
    accessToken?: string;
    userId?: string;
    userIdx: number;
}

export const userState = atom<userState>({
    key: "userState",
    default: {
        accessToken: "",
        userId: "",
        userIdx: 0,
    },
});
