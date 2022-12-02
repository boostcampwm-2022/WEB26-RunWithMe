import React from "react";
import SignUp from "#pages/SignUp/SignUp";
import Login from "#pages/Login/Login";
import MenuPage from "#pages/Menu/MenuPage";
import MainPage from "#pages/Main/MainPage";
import Courses from "#pages/Courses/Courses";
import { Route, Routes } from "react-router-dom";
import NewCourse from "#pages/NewCourse/NewCourse";
import RecruitDetail from "#pages/RecruitDetail/RecruitDetail";
import CourseDetail from "#pages/CourseDetail/CourseDetail";
import MockCourses from "#pages/MockCourses";
import MockRecruits from "#pages/MockRecruits";
import Recruits from "#pages/Recruits/Recruits";
import useRefreshQuery from "#hooks/queries/useRefreshQuery";
import MyPage from "#pages/MyPage/MyPage";

function App() {
    const { isLoading } = useRefreshQuery();
    if (isLoading) return <div>Loading...</div>;
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="courses" element={<Courses />} />
            <Route path="recruits" element={<Recruits />} />
            <Route path="course">
                <Route path="new" element={<NewCourse />} />
                <Route path=":id" element={<CourseDetail />} />
            </Route>
            <Route path="recruit">
                <Route path=":id" element={<RecruitDetail />} />
            </Route>
            <Route path="mock">
                <Route path="courses" element={<MockCourses />} />
                <Route path="recruits" element={<MockRecruits />} />
            </Route>
            <Route path="me" element={<MyPage />}></Route>
        </Routes>
    );
}

export default App;
