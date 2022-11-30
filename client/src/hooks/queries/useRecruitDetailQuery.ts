import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import { Recruit } from "#types/Recruit";
import { useQuery } from "@tanstack/react-query";

const useRecruitDetailQuery = (id: number) => {
    const { get } = useHttpGet<HttpResponse<Recruit>>();
    return useQuery<Recruit>(["recruit", id], async () => get(`/recruit/${id}`).then((res) => res.data), {
        refetchInterval: 2000,
    });
};
export default useRecruitDetailQuery;
