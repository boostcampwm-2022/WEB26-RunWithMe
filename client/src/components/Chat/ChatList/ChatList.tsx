import { userState } from "#atoms/userState";
import { SOCKET_EVENT } from "#constants/socketEvents";
import useChatHistoryQuery from "#hooks/queries/useChatQuery";
import { ChatResponse } from "#types/Chat";
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Socket } from "socket.io-client";
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
    history: ChatResponse[];
    loadMore: () => void;
    hasMore: boolean;
}

const ChatList = ({ unread, history, hasMore, loadMore }: ChatListProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

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
                loadMore={loadMore}
                hasMore={hasMore}
                isReverse={true}
                style={{ width: "100%" }}
                threshold={250}
                useWindow={false}
            >
                {[...history, ...unread].map((chat, idx) => (
                    <ChatItem data={chat} key={`chat_${idx}`} />
                ))}
            </InfiniteScroll>
        </ChatListContainer>
    );
};

export default ChatList;
