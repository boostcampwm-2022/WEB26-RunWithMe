import { userState } from "#atoms/userState";
import { TIME } from "#constants/time";
import useHttpGet from "#hooks/http/useHttpGet";
import AuthRefreshRes from "#types/dto/AuthRefreshRes";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

const useRefreshQuery = () => {
    const setUserInfo = useSetRecoilState(userState);
    const { get } = useHttpGet<AuthRefreshRes>();
    return useQuery(["refresh"], async () => get("/auth/refresh").then((res) => res || {}), {
        onSuccess: (response) => setUserInfo(response),
        refetchInterval: TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS,
    });
};

export default useRefreshQuery;
