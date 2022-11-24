import React, { useCallback, useEffect, useState } from "react";
import SignUp from "#pages/SignUp";
import Login from "#pages/Login";
import MainPage from "#pages/MainPage";
import Courses from "#pages/Courses";
import { useRecoilState } from "recoil";
import { userState } from "#atoms/userState";
import { Route, Routes } from "react-router-dom";
import NewCourse from "#pages/NewCourse/NewCourse";
import RecruitDetail from "#pages/RecruitDetail";
import CourseDetail from "#pages/CourseDetail";
import useGet from "#hooks/http/useHttpGet";

function App() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refreshRequestTimer, setRefreshRequestTimer] = useState<NodeJS.Timer | null>(null);
    const { get } = useGet();

    const getAccessToken = useCallback(async () => {
        const response = await get("/auth/refresh");
        setUserInfo(response.data);
    }, []);

    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        if (refreshRequestTimer) clearTimeout(refreshRequestTimer);
        setRefreshRequestTimer(
            setTimeout(() => {
                getAccessToken();
            }, 3000),
        );

        return () => {
            if (!refreshRequestTimer) return;
            clearTimeout(refreshRequestTimer);
        };
    }, [userInfo]);

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course">
                <Route path="new" element={<NewCourse />} />
                <Route path=":id" element={<CourseDetail />} />
            </Route>
            <Route path="recruit">
                <Route path=":id" element={<RecruitDetail />} />
            </Route>
        </Routes>
    );
}

export default App;
