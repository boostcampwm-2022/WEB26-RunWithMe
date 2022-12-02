import { userState } from "#atoms/userState";
import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import useHttpGet from "#hooks/http/useHttpGet";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { flexColumnSpaceBetween } from "styles/flex";

const Body = styled.div`
    ${flexColumnSpaceBetween};
    gap: 5rem;
    align-items: center;
    padding: 10rem;
`;

const UserId = styled.div`
    font-size: 3rem;
`;

const Mypage = () => {
    const userInfo = useRecoilValue(userState);
    const { get } = useHttpGet();
    const userStateReset = useResetRecoilState(userState);
    const navigate = useNavigate();
    const logoutOnClick = async () => {
        try {
            console.log(userInfo);
            userStateReset();
            await get("/auth/logout");
            navigate("/");
        } catch {}
    };
    return (
        <>
            <Header text="마이페이지" />
            <Body>
                <UserId>{userInfo.userId}</UserId>
                <Button width="fill" onClick={logoutOnClick}>
                    로그아웃
                </Button>
            </Body>
        </>
    );
};
export default Mypage;
