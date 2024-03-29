import MoreTitle from "#components/commons/MoreTitle/MoreTitle";
import Header from "#components/Header/Header";
import CourseCarousel from "#components/RecommendCourses/CourseCarousel";
import CourseCarouselLoader from "#components/RecommendCourses/CourseCarousel.loader";
import RecruitCarousel from "#components/RecruitCarousel/RecruitCarousel";
import RecruitCarouselLoader from "#components/RecruitCarousel/RecruitCarousel.loader";
import usePreload from "#hooks/usePreload";
import { Suspense } from "react";
import styled from "styled-components";
import { CourseDetail, Courses, Login, MyPage, RecruitDetail, Recruits } from "#pages/index";

const MainPageContainer = styled.div`
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    > div:first-child {
        margin-bottom: 16px;
    }
    > div:last-child {
        margin-top: 48px;
    }
`;

const MainPage = () => {
    usePreload(RecruitDetail, Recruits, MyPage, CourseDetail, Courses, Login);
    return (
        <MainPageContainer>
            <Header isMain={true} text="RunWithMe" />
            <div>
                <MoreTitle text="코스 목록" to="/courses" />
                <Suspense fallback={<CourseCarouselLoader />}>
                    <CourseCarousel />
                </Suspense>
            </div>
            <div>
                <MoreTitle text="모집 목록" to="/recruits" />
                <Suspense fallback={<RecruitCarouselLoader />}>
                    <RecruitCarousel />
                </Suspense>
            </div>
        </MainPageContainer>
    );
};

export default MainPage;
