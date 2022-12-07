import useHttpGet from "#hooks/http/useHttpGet";
import { Course } from "#types/Course";
import HttpResponse from "#types/dto/HttpResponse";
import { useQuery } from "@tanstack/react-query";

const useMyCoursesQuery = () => {
    const { get } = useHttpGet<HttpResponse<Course[]>>();
    return useQuery<HttpResponse<Course[]>>(["course"], async () => get(`/user/me/course`).then((res) => res || {}));
};

export default useMyCoursesQuery;
