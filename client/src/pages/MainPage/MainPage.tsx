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
    const handleCoursesClick = () => {
        navigate("/courses");
    };
    const handleCourseNewClick = () => {
        navigate("/course/new");
    };
    const handleRecruitDetailClick = () => {
        navigate("/recruit/1");
    };
    const handleCourseDetailClick = () => {
        navigate("/course/1");
    };
    const handleRecruitsClick = () => {
        navigate("/recruits");
    };
    const handleCourseMockClick = () => {
        navigate("/mock/course");
    };

    return (
        <>
            <button onClick={handleLoginClick}>로그인</button>
            <button onClick={handleSignUpClick}>회원가입 </button>
            <button onClick={handleCoursesClick}>코스목록</button>
            <button onClick={handleRecruitsClick}>모집목록</button>
            <button onClick={handleCourseNewClick}>코스등록 </button>
            <button onClick={handleRecruitDetailClick}>모집상세 </button>
            <button onClick={handleCourseDetailClick}>코스상세 </button>
            <button onClick={handleCourseMockClick}>코스 더미데이터 생성</button>
        </>
    );
};

export default MainPage;
