import useHttpGet from "#hooks/http/useHttpGet";
import { Profile } from "#types/Profile";
import HttpResponse from "#types/dto/HttpResponse";
import { useQuery } from "@tanstack/react-query";

const useMyProfileQuery = () => {
    const { get } = useHttpGet<HttpResponse<Profile>>();
    return useQuery<HttpResponse<Profile>>(["profile"], async () => get(`/user/me`).then((res) => res || {}));
};

export default useMyProfileQuery;
