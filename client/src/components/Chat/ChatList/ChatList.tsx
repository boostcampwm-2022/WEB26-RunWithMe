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
    /* flex-direction: column-reverse; */
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
    unread: ChatResponse[];
    paused: number;
}

const ChatList = ({ unread, paused }: ChatListProps) => {
    const { id } = useParams();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: chatHistory, fetchNextPage, hasNextPage } = useChatHistoryQuery({ recruitId: Number(id), paused });

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [unread]);

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
        }, 100);
    }, []);

    return (
        <ChatListContainer ref={scrollRef}>
            <InfiniteScroll
                loadMore={() => fetchNextPage()}
                hasMore={hasNextPage}
                isReverse={true}
                style={{ width: "100%" }}
                threshold={250}
                useWindow={false}
            >
                {[
                    ...(chatHistory?.pages.reduce<ChatResponse[]>((acc, cur) => {
                        return [...cur.data, ...acc];
                    }, []) || []),
                    ...unread,
                ].map((chat, idx) => (
                    <ChatItem data={chat} key={`chat_${idx}`} />
                ))}
            </InfiniteScroll>
        </ChatListContainer>
    );
};

export default ChatList;
