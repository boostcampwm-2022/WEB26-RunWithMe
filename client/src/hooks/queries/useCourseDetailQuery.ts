import useHttpGet from "#hooks/http/useHttpGet";
import GetCourseRes from "#types/dto/GetCourseRes";
import { useQuery } from "@tanstack/react-query";

const useCourseDetailQuery = (id: number) => {
    const { get } = useHttpGet<GetCourseRes>();
    return useQuery<GetCourseRes>(["course", id], async () => get(`/course/${id}`).then((res) => res || {}));
};
export default useCourseDetailQuery;
