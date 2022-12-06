import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import { Recruit } from "#types/Recruit";
import { useQuery } from "@tanstack/react-query";

const useRecruitsQuery = () => {
    const { get } = useHttpGet<HttpResponse<Recruit[]>>();
    return useQuery<HttpResponse<Recruit[]>>(["recruit"], async () => get(`/recruit`).then((res) => res || {}));
};

export default useRecruitsQuery;
