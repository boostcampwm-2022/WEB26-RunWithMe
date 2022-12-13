import Button from "#components/Button/Button";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

interface ChatButtonProps {
    waiting?: number;
}

const Badge = styled.span`
    ${flexRow({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER })};
    border-radius: 50%;
    position: absolute;
    right: -0.6rem;
    top: -0.6rem;
    width: 2rem;
    height: 2rem;
    background-color: red;
    color: white !important;
    font-weight: 900;
    font-size: 1.2rem;
`;

const ChatButton = ({ waiting }: ChatButtonProps) => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Button backgroundColor={COLOR.CHAT_BUTTON} onClick={() => navigate(`/recruit/${id}/chat`)}>
            채팅
            {!!waiting && <Badge>{waiting > 9 ? "9+" : waiting}</Badge>}
        </Button>
    );
};

export default ChatButton;
