import { userState } from "#atoms/userState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useUser = () => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인");
            navigate("/login");
        }
    }, []);

    return user;
};

export default useUser;
