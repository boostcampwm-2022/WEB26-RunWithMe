import useHttpGet from "#hooks/http/useHttpGet";
import { Course } from "#types/Course";
import HttpResponse from "#types/dto/HttpResponse";
import { useQuery } from "@tanstack/react-query";

const useCourseDetailQuery = (id: number) => {
    const { get } = useHttpGet<HttpResponse<Course>>();
    return useQuery<Course>(["course", id], async () => get(`/course/${id}`).then((res) => res.data));
};
export default useCourseDetailQuery;
