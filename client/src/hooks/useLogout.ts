import { loggedInState, userState } from "#atoms/userState";
import { useCallback } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

const useLogout = () => {
    const resetUser = useResetRecoilState(userState);
    const setLoggedIn = useSetRecoilState(loggedInState);
    const logout = useCallback(() => {
        resetUser();
        setLoggedIn(false);
    }, []);
    return logout;
};

export default useLogout;
