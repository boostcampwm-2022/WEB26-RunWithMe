import Button from "#components/Button/Button";
import { flexColumn, flexColumnSpaceBetween, flexRowSpaceBetween } from "styles/flex";
import styled from "styled-components";
import { fontLarge, fontSmall } from "styles/font";
import { COLOR } from "styles/color";
import { MYPAGE } from "#constants/myPageOptions";
import { MyPageProps } from "./MyPageTypes";
import useHttpGet from "#hooks/http/useHttpGet";
import { useNavigate } from "react-router-dom";
import useLogout from "#hooks/useLogout";

const MyInfoWrapper = styled.div`
    width: 100%;
    ${flexColumnSpaceBetween}
    align-items: center;
    button {
        width: 90%;
    }
    gap: 30px;
`;

const MyName = styled.div`
    padding: 30px 50px;
    ${fontLarge(COLOR.BLACK, 700)};
`;

const MyInfo = styled.div`
    width: 90%;
    ${flexRowSpaceBetween}
    & span:last-child {
        ${fontSmall(COLOR.BLACK, 700)};
    }
    & span:first-child {
        ${fontSmall(COLOR.LIGHT_GRAY, 500)};
    }
`;

const MyProfileButtonsWrapper = styled.div`
    width: 100%;
    ${flexColumn}
    align-items: center;
    gap: 10px;
`;

const MyPageProfile = ({ MyPageOption }: MyPageProps) => {
    const { get } = useHttpGet();
    const logout = useLogout();
    const navigate = useNavigate();
    const logoutOnClick = async () => {
        try {
            await get("/auth/logout");
            logout();
            navigate("/");
        } catch {}
    };
    return (
        <>
            {MyPageOption == MYPAGE.PROFILE && (
                <MyInfoWrapper>
                    <MyName>catenary</MyName>

                    <MyInfo>
                        <span>지역</span>
                        <span>경기도 용인시 수지구 동천동</span>
                    </MyInfo>
                    <MyInfo>
                        <span>페이스</span>
                        <span>3min/km</span>
                    </MyInfo>
                    <MyProfileButtonsWrapper>
                        <Button width="fill">회원정보 변경</Button>
                        <Button width="fill" onClick={logoutOnClick}>
                            로그아웃
                        </Button>
                    </MyProfileButtonsWrapper>
                </MyInfoWrapper>
            )}
        </>
    );
};

export default MyPageProfile;
