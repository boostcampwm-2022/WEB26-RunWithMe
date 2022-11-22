import React from "react";
import { useNavigate } from "react-router-dom";

/*
 임시 메인페이지입니다 (라우팅 / 내비게이션 테스팅용)
 */
const MainPage = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleSignUpClick = () => {
        navigate("/signup");
    };
    const handleCourseNewClick = () => {
        navigate("/course/new");
    };
    const handleRecruitDetailClick = () => {
        navigate("/recruit/detail");
    };
    const handleCourseDetailClick = () => {
        navigate("/course/detail");
    };

    return (
        <>
            <button onClick={handleLoginClick}>로그인</button>
            <button onClick={handleSignUpClick}>회원가입 </button>
            <button onClick={handleCourseNewClick}>코스등록 </button>
            <button onClick={handleRecruitDetailClick}>모집상세 </button>
            <button onClick={handleCourseDetailClick}>코스상세 </button>
        </>
    );
};

export default MainPage;
