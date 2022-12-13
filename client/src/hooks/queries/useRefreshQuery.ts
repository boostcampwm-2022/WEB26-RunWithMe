import { loggedInState, userState } from "#atoms/userState";
import { TIME } from "#constants/time";
import { DEFAULT_USER_INFO } from "#constants/userInfo";
import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import UserInfo from "#types/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useLoggedInMutation from "./useLoggedInQuery";

const useRefreshQuery = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const loggedIn = useRecoilValue(loggedInState);
    const { get } = useHttpGet<HttpResponse<UserInfo>>();
    const { mutateAsync } = useLoggedInMutation();

    const refetchUserInfo = useCallback(() => {
        if (loggedIn === null) {
            return mutateAsync().then((res) =>
                res.isLoggedIn ? get("/auth/refresh").then((res) => res.data) : DEFAULT_USER_INFO,
            );
        }
        return loggedIn ? get("/auth/refresh").then((res) => res.data) : DEFAULT_USER_INFO;
    }, [loggedIn]);

    return useQuery(["refresh"], refetchUserInfo, {
        onSuccess: setUserInfo,
        retry: !!(userInfo && userInfo.accessToken),
        refetchInterval: TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS,
        refetchOnReconnect: false,
        suspense: true,
    });
};

export default useRefreshQuery;
