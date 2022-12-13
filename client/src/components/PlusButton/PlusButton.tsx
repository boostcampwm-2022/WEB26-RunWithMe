import { PLUS_BUTTON_ICON } from "#assets/icons";
import { userState } from "#atoms/userState";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Button = styled.img`
    width: 56px;
    height: 56px;
    position: fixed;
    right: calc((100vw - 390px) / 2 + 12px);
    bottom: 12px;
    z-index: 2;
    @media screen and (min-width: 960px) {
        right: calc((100vw - 990px) / 2 + 12px);
    }
`;

interface PlusButtonProps {
    to: string;
}
const PlusButton = ({ to }: PlusButtonProps) => {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    if (!user.accessToken) return <></>;
    return <Button src={PLUS_BUTTON_ICON} onClick={() => navigate(to)} />;
};

export default PlusButton;
