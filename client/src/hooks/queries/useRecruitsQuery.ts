import { RecruitListProps } from "#components/RecruitList/RecruitList";
import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import { RecruitFilterParams } from "#types/FilterParams";
import { Recruit } from "#types/Recruit";
import { useInfiniteQuery } from "@tanstack/react-query";

const useRecruitsQuery = ({ distance, query, availFilter, authorFilter, titleFilter, time }: RecruitListProps) => {
    const { get } = useHttpGet<HttpResponse<Recruit[]>>();

    const recruitQueryParams = (page: number): RecruitFilterParams => {
        const param: any = {};
        param.title = titleFilter ? "true" : "false";
        param.author = authorFilter ? "true" : "false";
        param.avail = availFilter ? "true" : "false";
        if (query !== "") param.query = query;
        if (distance) {
            param.maxLen = (distance.max * 1000).toString();
            param.minLen = (distance.min * 1000).toString();
        }
        if (time) {
            param.time = time.max.toString();
        }
        param.page = page;
        return param;
    };

    return useInfiniteQuery(
        ["recruits", distance?.min, distance?.max, authorFilter, titleFilter, query],
        ({ pageParam = 1 }) => get("/recruit", recruitQueryParams(pageParam)).then((res) => res.data),
        {
            getNextPageParam: (lastPage, allPages) => lastPage.length > 0 && allPages.length + 1,
        },
    );
};
export default useRecruitsQuery;
