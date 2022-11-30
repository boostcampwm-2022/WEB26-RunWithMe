import { userState } from "#atoms/userState";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

/**
 * @param {boolean} withAuth - true: 로그인된 유저만 접근 가능 / false: 로그인된 유저는 접근 불가능
 * 잠시 닫아둘게용
 */
const useAuth = (withAuth = true) => {
    const user = useRecoilValue(userState);
    console.log(withAuth);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (withAuth && !user.accessToken) {
    //         alert("로그인이 필요한 페이지입니다");
    //         navigate("/login");
    //     }
    //     if (!withAuth && user.accessToken) {
    //         alert("이미 로그인 중입니다");
    //         navigate(-1);
    //     }
    // });
    return user;
};

export default useAuth;
