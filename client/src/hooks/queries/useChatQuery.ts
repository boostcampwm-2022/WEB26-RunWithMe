import { userState } from "#atoms/userState";
import { ChatResponse } from "#types/Chat";
import HttpResponse from "#types/dto/HttpResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";

const useChatHistoryQuery = ({ recruitId }: { recruitId: number }) => {
    const { userId } = useRecoilValue(userState);
    return useInfiniteQuery(
        ["chats", recruitId],
        ({ pageParam = 1 }) =>
            axios
                .get<HttpResponse<ChatResponse[]>>("/chat", {
                    baseURL: import.meta.env.VITE_CHAT_API_URL,
                    params: {
                        recruitId,
                        userId,
                        page: pageParam,
                    },
                })
                .then((res) => res.data),
        {
            getNextPageParam: (lastPage, allPages) => (lastPage ? lastPage?.data.length > 0 && allPages.length + 1 : 1),
            suspense: false,
        },
    );
};
export default useChatHistoryQuery;
