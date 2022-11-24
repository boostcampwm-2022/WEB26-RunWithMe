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
import { TIME } from "#constants/time";
import Recruits from "#pages/Recruits";

function App() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refreshRequestTimer, setRefreshRequestTimer] = useState<NodeJS.Timer | null>(null);
    const { get } = useGet();

    const getAccessToken = useCallback(async () => {
        try {
            const response = await get("/auth/refresh");
            setUserInfo(response.data);
        } catch {}
    }, []);

    useEffect(() => {
        getAccessToken();
    }, []);

    useEffect(() => {
        if (refreshRequestTimer) clearTimeout(refreshRequestTimer);
        setRefreshRequestTimer(
            setTimeout(() => {
                getAccessToken();
            }, TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS),
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
            <Route path="recruits" element={<Recruits />} />
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
