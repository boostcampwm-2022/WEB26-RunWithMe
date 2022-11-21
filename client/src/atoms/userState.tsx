import { atom } from "recoil";

interface userState {
    accessToken?: string;
    userId?: string;
}

export const userState = atom<userState>({
    key: "userState",
    default: {
        accessToken: "",
        userId: "",
    },
});
