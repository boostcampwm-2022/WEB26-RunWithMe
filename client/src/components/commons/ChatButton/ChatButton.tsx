import Button from "#components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR } from "styles/color";

const ChatButton = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <Button backgroundColor={COLOR.ORANGE} onClick={() => navigate(`/recruit/${id}/chat`)}>
            채팅
        </Button>
    );
};

export default ChatButton;
