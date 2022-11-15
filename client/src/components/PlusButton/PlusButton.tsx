import { PLUS_BUTTON } from "#assets/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.img`
    width: 56px;
    height: 56px;
    position: fixed;
    right: 12px;
    bottom: 12px;
`;

interface PlusButtonProps {
    to: string;
}
const PlusButton = ({ to }: PlusButtonProps) => {
    const navigate = useNavigate();
    return <Button src={PLUS_BUTTON} onClick={() => navigate(to)} />;
};

export default PlusButton;
