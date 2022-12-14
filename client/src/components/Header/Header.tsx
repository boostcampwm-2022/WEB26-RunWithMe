import styled from "styled-components";
import { flexRow } from "styles/flex";
import { ARROW_LEFT_ICON, HOME_ICON, USER_CIRCLE_ICON } from "#assets/icons";
import { useNavigate } from "react-router-dom";
import { COLOR } from "styles/color";
import { fontLarge } from "styles/font";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
const HeaderWrapper = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    padding: 16px 8px;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    p {
        ${fontLarge(COLOR.BLACK, 600)}
    }
    img {
        width: 24px;
        height: 24px;
    }
    div {
        width: 56px;
        ${flexRow({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.FLEX_END })};
        > * {
            margin: 0 2px;
        }
    }
`;

const Dummy = styled.div`
    width: 24px;
    height: 24px;
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
            {isMain ? (
                <div>
                    <Dummy />
                </div>
            ) : (
                <div>
                    <img
                        width="14"
                        height="14"
                        alt="ARROW_LEFT_ICON"
                        src={ARROW_LEFT_ICON}
                        onClick={() => navigate(-1)}
                    />
                    <Dummy />
                </div>
            )}

            <p>{text}</p>
            <div>
                {!isMain && (
                    <img width="14" height="14" alt="HOME_ICON" src={HOME_ICON} onClick={() => navigate("/")} />
                )}
                <img
                    width="14"
                    height="14"
                    alt="USER_CIRCLE_ICON"
                    src={USER_CIRCLE_ICON}
                    onClick={() => navigate(userInfo.accessToken ? "/me" : "/login")}
                />
            </div>
        </HeaderWrapper>
    );
};

export default Header;
