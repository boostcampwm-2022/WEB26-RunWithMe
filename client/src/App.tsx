import React from "react";
import SignUp from "#pages/SignUp/SignUp";
import Login from "#pages/Login/Login";
import MainPage from "#pages/MainPage/MainPage";
import Courses from "#pages/Courses/Courses";
import { Route, Routes } from "react-router-dom";
import NewCourse from "#pages/NewCourse/NewCourse";
import RecruitDetail from "#pages/RecruitDetail/RecruitDetail";
import CourseDetail from "#pages/CourseDetail/CourseDetail";
import Mock from "#pages/Mock";
import Recruits from "#pages/Recruits/Recruits";
import useRefreshQuery from "#hooks/queries/useRefreshQuery";

function App() {
    useRefreshQuery();

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
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
                <Route path="course" element={<Mock />} />
            </Route>
        </Routes>
    );
}

export default App;
