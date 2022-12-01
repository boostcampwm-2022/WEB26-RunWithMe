import useHttpGet from "#hooks/http/useHttpGet";
import { Course } from "#types/Course";
import HttpResponse from "#types/dto/HttpResponse";
import { useQuery } from "@tanstack/react-query";

const useCoursesQuery = () => {
    const { get } = useHttpGet<HttpResponse<Course[]>>();
    return useQuery<HttpResponse<Course[]>>(["course"], async () => get(`/course`).then((res) => res || {}));
};

export default useCoursesQuery;
