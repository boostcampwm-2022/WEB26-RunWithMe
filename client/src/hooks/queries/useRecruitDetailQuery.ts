import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import { RecruitDetail } from "#types/RecruitDetail";
import { useQuery } from "@tanstack/react-query";

const useRecruitDetailQuery = (id: number) => {
    const { get } = useHttpGet<HttpResponse<RecruitDetail>>();
    return useQuery<RecruitDetail>(["recruit", id], async () => get(`/recruit/${id}`).then((res) => res.data));
};
export default useRecruitDetailQuery;
