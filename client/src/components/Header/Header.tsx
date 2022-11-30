import styled from "styled-components";
import { flexRowSpaceBetween } from "styles/flex";
import { ARROW_LEFT_ICON, USER_CIRCLE_ICON } from "#assets/icons";
import { useNavigate } from "react-router-dom";
import { COLOR } from "styles/color";
import { fontLarge } from "styles/font";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";
const HeaderWrapper = styled.div`
    ${flexRowSpaceBetween};
    padding: 16px 8px;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    p {
        ${fontLarge(COLOR.BLACK, 400)}
    }
    img {
        width: 24px;
        height: 24px;
    }
    div {
        width: 24px;
        height: 24px;
    }
`;

interface HeaderProps {
    text: string;
    isMain?: boolean;
}

const Header = ({ text, isMain = false }: HeaderProps) => {
    const navigate = useNavigate();
    const userInfo = useRecoilValue(userState);
    return (
        <HeaderWrapper>
            {isMain ? <div /> : <img src={ARROW_LEFT_ICON} onClick={() => navigate(-1)} />}

            <p>{text}</p>
            <img src={USER_CIRCLE_ICON} onClick={() => navigate(userInfo.accessToken ? "/mypage" : "/login")} />
        </HeaderWrapper>
    );
};

export default Header;
