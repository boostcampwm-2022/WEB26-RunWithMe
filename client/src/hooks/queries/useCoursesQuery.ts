import useHttpGet from "#hooks/http/useHttpGet";
import GetCoursesRes from "#types/dto/GetCoursesRes";
import { useQuery } from "@tanstack/react-query";

const useCoursesQuery = () => {
    const { get } = useHttpGet<GetCoursesRes>();
    return useQuery<GetCoursesRes>(["course"], async () => get(`/course`).then((res) => res || {}));
};

export default useCoursesQuery;
