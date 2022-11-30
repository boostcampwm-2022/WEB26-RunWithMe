import useHttpGet from "#hooks/http/useHttpGet";
import GetRecruitRes from "#types/dto/GetRecruitRes";
import { useQuery } from "@tanstack/react-query";

const useRecruitDetailQuery = (id: number) => {
    const { get } = useHttpGet<GetRecruitRes>();
    return useQuery<GetRecruitRes>(["recruit", id], async () => get(`/recruit/${id}`).then((res) => res), {
        refetchInterval: 2000,
    });
};
export default useRecruitDetailQuery;
