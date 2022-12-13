import { CourseListProps } from "#components/CardList/CourseList/CorseList";
import useHttpGet from "#hooks/http/useHttpGet";
import { Course } from "#types/Course";
import HttpResponse from "#types/dto/HttpResponse";
import { CourseFilterParams } from "#types/FilterParams";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCoursesQuery = ({ distance, query, authorFilter, titleFilter }: CourseListProps) => {
    const { get } = useHttpGet<HttpResponse<Course[]>>();

    const courseQueryParams = (page: number): CourseFilterParams => {
        const param: CourseFilterParams = {
            title: titleFilter ? "true" : "false",
            author: authorFilter ? "true" : "false",
        };
        if (distance) {
            param.maxLen = (distance.max * 1000).toString();
            param.minLen = (distance.min * 1000).toString();
        }
        if (query !== "") param.query = query;
        param.page = page;
        return param;
    };

    return useInfiniteQuery(
        ["courses", distance?.min, distance?.max, authorFilter, titleFilter, query],
        ({ pageParam = 1 }) => get("/course", courseQueryParams(pageParam)).then((res) => res.data),
        {
            getNextPageParam: (lastPage, allPages) => (lastPage ? lastPage?.length > 0 && allPages.length + 1 : 1),
            suspense: true,
        },
    );
};
export default useCoursesQuery;
