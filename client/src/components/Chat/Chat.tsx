import { userState } from "#atoms/userState";
import { SOCKET_EVENT } from "#constants/socketEvents";
import { HEADER_HEIGHT } from "#constants/styles";
import { ChatResponse } from "#types/Chat";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import ChatInput from "./ChatInput/ChatInput";
import ChatList from "./ChatList/ChatList";
import ChatRoomSummary from "./ChatRoomSummary/ChatRoomSummary";

const ChatContainer = styled.div`
    ${flexColumn({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT});
`;

const Chat = () => {
    const { userId } = useRecoilValue(userState);
    const [chatList, setChatList] = useState<ChatResponse[]>([]);
    const { id } = useParams();
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;
        const socket = io(import.meta.env.VITE_CHAT_URL, { autoConnect: true, reconnection: false });
        socket.emit(SOCKET_EVENT.JOIN, { userId, recruitId: Number(id) });
        // socket.on(SOCKET_EVENT.SERVER_SENT_RECENT, setChatList);
        // socket.on(SOCKET_EVENT.SERVER_SENT, (data) => setChatList((prev) => [...prev, data]));
        socket.on(SOCKET_EVENT.SERVER_SENT_UNREAD, (data) => setChatList((prev) => [...prev, data]));
        socketRef.current = socket;
        () => {
            socket.disconnect();
        };
    }, [userId]);

    const sendMessage = useCallback(
        (content: string) => {
            if (!socketRef.current) return;
            socketRef.current.emit(SOCKET_EVENT.CLIENT_SENT, { content });
        },
        [socketRef],
    );

    return (
        <ChatContainer>
            <ChatRoomSummary id={Number(id)} />
            <ChatList data={chatList} />
            <ChatInput sendMessage={sendMessage} />
        </ChatContainer>
    );
};

export default Chat;
