import { ChatResponse } from "#types/Chat";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import ChatItem from "../ChatItem/ChatItem";

const ChatListContainer = styled.div`
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
}

const ChatList = ({ data }: ChatListProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [data]);

    return (
        <ChatListContainer ref={scrollRef}>
            {data.map((el, idx) => (
                <ChatItem data={el} key={`${el.recruitId}_${idx}`} />
            ))}
        </ChatListContainer>
    );
};

export default ChatList;
