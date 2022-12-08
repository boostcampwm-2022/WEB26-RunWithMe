import useHttpGet from "#hooks/http/useHttpGet";
import { Course } from "#types/Course";
import HttpResponse from "#types/dto/HttpResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCourseListQuery = () => {
    const { get } = useHttpGet<HttpResponse<Course[]>>();
    return useInfiniteQuery(["courses"], ({ pageParam }) => get("/course", pageParam).then((res) => res.data), {
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 && allPages.length + 1,
    });
};
export default useCourseListQuery;
