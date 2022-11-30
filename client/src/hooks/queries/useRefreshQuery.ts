import { userState } from "#atoms/userState";
import { TIME } from "#constants/time";
import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import UserInfo from "#types/UserInfo";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

const useRefreshQuery = () => {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const { get } = useHttpGet<HttpResponse<UserInfo>>();

    return useQuery(["refresh"], async () => get("/auth/refresh").then((res) => res.data || {}), {
        onSuccess: setUserInfo,
        retry: !!(userInfo && userInfo.accessToken),
        refetchInterval: TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS,
    });
};

export default useRefreshQuery;
