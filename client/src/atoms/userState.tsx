import AuthRefreshRes from "#types/dto/AuthRefreshRes";
import { atom } from "recoil";

export const userState = atom<AuthRefreshRes>({
    key: "userState",
    default: {
        accessToken: "",
        userId: "",
        userIdx: 0,
    },
});
