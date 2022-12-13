import useChatHistoryQuery from "#hooks/queries/useChatQuery";
import { ChatResponse } from "#types/Chat";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import ChatItem from "../ChatItem/ChatItem";

const ChatListContainer = styled.div`
    ${flexColumn({})};
    flex-direction: column-reverse;
    padding: 15px;
    width: 100%;
    height: inherit;
    overflow: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

interface ChatListProps {
    data: ChatResponse[];
    setChatList: Dispatch<SetStateAction<ChatResponse[]>>;
}

const ChatList = ({ data, setChatList }: ChatListProps) => {
    const { id } = useParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: chatHistory, fetchNextPage, hasNextPage } = useChatHistoryQuery({ recruitId: Number(id) });

    useEffect(() => {
        if (chatHistory?.pages?.at(-1)?.data === undefined) return;
        // console.log(chatHistory?.pages?.at(-1)?.data);
        setChatList((prev) => [...prev, ...(chatHistory?.pages?.at(-1)?.data || [])]);
    }, [chatHistory]);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [data]);

    return (
        <ChatListContainer ref={scrollRef}>
            <InfiniteScroll
                loadMore={() => fetchNextPage()}
                hasMore={hasNextPage}
                isReverse={true}
                loader={<div>...loading</div>}
            >
                {data.map((el, idx) => (
                    <ChatItem data={el} key={`${el.recruitId}_${idx}`} />
                ))}
            </InfiniteScroll>
        </ChatListContainer>
    );
};

export default ChatList;
