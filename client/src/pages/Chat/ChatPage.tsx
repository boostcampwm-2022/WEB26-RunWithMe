import Chat from "#components/Chat/Chat";
import Header from "#components/Header/Header";
import useAuth from "#hooks/useAuth";

const ChatPage = () => {
    useAuth();
    return (
        <>
            <Header text="채팅" />
            <Chat />
        </>
    );
};

export default ChatPage;
