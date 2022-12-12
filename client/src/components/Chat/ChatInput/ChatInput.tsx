import { SEND_ICON } from "#assets/icons";
import { ALIGN_ITEMS } from "#types/flexOptions";
import { FormEventHandler, useCallback, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

const ChatInputForm = styled.form`
    ${flexRow({ alignItems: ALIGN_ITEMS.CENTER })};
    background-color: ${COLOR.F1F4F7};
    width: 100%;
    padding: 8px 20px;
    input {
        border: none;
        padding: 10px;
        width: 100%;
        :focus {
            outline: none;
        }
    }
    button {
        background-color: ${COLOR.WHITE};
        border: none;
        height: 100%;
        padding: 10px;
    }
`;

interface ChatInputProps {
    sendMessage: (message: string) => void;
}

const ChatInput = ({ sendMessage }: ChatInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickSend = useCallback(() => {
        if (!inputRef.current || !inputRef.current.value) return;
        sendMessage(inputRef.current.value);
        inputRef.current.value = "";
    }, [inputRef]);

    const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback((e) => {
        onClickSend();
        e.preventDefault();
    }, []);

    return (
        <ChatInputForm onSubmit={onSubmitForm}>
            <input ref={inputRef} placeholder="메시지를 입력해주세요" />
            <button onClick={onClickSend} type="button">
                <img width="14" height="14" alt="USER_CIRCLE_ICON" src={SEND_ICON} />
            </button>
        </ChatInputForm>
    );
};

export default ChatInput;
