import { userState } from "#atoms/userState";
import { TIME } from "#constants/time";
import useHttpGet from "#hooks/http/useHttpGet";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

const useRefreshQuery = () => {
    const setUserInfo = useSetRecoilState(userState);
    const { get } = useHttpGet();
    return useQuery(["refresh"], async () => get("/auth/refresh").then((res) => res?.data || {}), {
        onSuccess: (response) => setUserInfo(response),
        refetchInterval: TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS,
    });
};

export default useRefreshQuery;
