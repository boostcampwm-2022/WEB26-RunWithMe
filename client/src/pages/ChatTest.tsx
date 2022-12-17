import { useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Chat = {
    id: number;
    sender: string; // userId
    recruitId: number;
    content: string;
    createdAt: Date;
};

const ChatTest = () => {
    const socket = useRef<Socket | null>(null);

    const [recruitId, setRecruitId] = useState("");
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<Chat[]>([]);
    const [userId, setUserId] = useState("");
    const connect = () => {
        socket.current = io(`http://localhost:8080/chat`);
        socket.current.emit("join", { userId, recruitId });
        socket.current.once("server_sent_recent", (message: Chat[]) => setHistory((prev) => [...prev, ...message]));
        socket.current.on("server_sent", (message: Chat) => setHistory((prev) => [...prev, message]));
    };

    const onClickSend = () => {
        if (!socket.current) return;
        socket.current.emit("client_sent", { content: message });
    };

    return (
        <div>
            <div>
                <input placeholder="userId" onChange={(e) => setUserId(e.target.value)} />
                <input placeholder="recruitId" onChange={(e) => setRecruitId(e.target.value)} />
                <button onClick={connect}>소켓연결</button>
            </div>
            <input placeholder="message" onChange={(e) => setMessage(e.target.value)}></input>
            <button onClick={onClickSend}>전송</button>
            {history.map((msg) => {
                return (
                    <>
                        <div>sender : {msg.sender}</div>
                        <div>content : {msg.content}</div>
                        <br />
                    </>
                );
            })}
        </div>
    );
};

export default ChatTest;
