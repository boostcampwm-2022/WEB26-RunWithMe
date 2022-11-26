import { userState } from "#atoms/userState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

/**
 * @param {boolean} withAuth - true: 로그인 필요 / false: 로그아웃 필요
 */
const useAuth = (withAuth = true) => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    useEffect(() => {
        if (withAuth && !user.accessToken) {
            alert("로그인이 필요한 페이지입니다");
            navigate("/login");
        }
        if (!withAuth && user.accessToken) {
            alert("이미 로그인 중입니다");
            navigate(-1);
        }
    });
    return user;
};

export default useAuth;
