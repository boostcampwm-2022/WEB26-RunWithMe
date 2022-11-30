import UserInfo from "#types/UserInfo";
import { atom } from "recoil";

export const userState = atom<UserInfo>({
    key: "userState",
    default: {
        accessToken: "",
        userId: "",
        userIdx: 0,
    },
});
