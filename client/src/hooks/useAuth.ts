import { userState } from "#atoms/userState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useAuth = () => {
    const userInfo = useRecoilValue(userState);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo.accessToken) {
            alert("로그인이 필요한 페이지입니다");
            navigate("/login");
        }
    }, []);
    return userInfo;
};

export default useAuth;
