import { userState } from "#atoms/userState";
import { SOCKET_EVENT } from "#constants/socketEvents";
import { HEADER_HEIGHT } from "#constants/styles";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
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
    const [unread, setUnread] = useState<ChatResponse[]>([]);
    const { id } = useParams();
    const socketRef = useRef<Socket | null>(null);
    const { data } = useRecruitDetailQuery(Number(id));

    useEffect(() => {
        if (!userId) return;
        const socket = io(import.meta.env.VITE_CHAT_URL, { autoConnect: true, reconnection: false });
        socket.emit(SOCKET_EVENT.JOIN, { userId, recruitId: Number(id) });
        socket.on(SOCKET_EVENT.SERVER_SENT_UNREAD, (message) => setUnread((prev) => [...prev, message]));
        socketRef.current = socket;
        return () => {
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

    if (!data) return <div></div>;

    return (
        <ChatContainer>
            <ChatRoomSummary data={data} />
            <ChatList unread={unread} paused={Number(data.paused)} />
            <ChatInput sendMessage={sendMessage} />
        </ChatContainer>
    );
};

export default Chat;
