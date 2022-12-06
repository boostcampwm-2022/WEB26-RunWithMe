import { loggedInState, userState } from "#atoms/userState";
import UserInfo from "#types/UserInfo";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

const useLogin = () => {
    const setUserInfo = useSetRecoilState(userState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    const login = useCallback((userInfo: UserInfo) => {
        setUserInfo(userInfo);
        setLoggedIn(true);
    }, []);
    return login;
};

export default useLogin;
