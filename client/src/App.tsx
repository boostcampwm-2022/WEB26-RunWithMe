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
import Layout from "#components/Layout/Layout";
import Mypage from "#pages/Mypage/Mypage";

function App() {
    const { isLoading } = useRefreshQuery();
    if (isLoading) return <div>Loading...</div>;
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/mypage" element={<Mypage />} />
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
            </Routes>
        </Layout>
    );
}

export default App;
