import React, { useEffect, useState } from "react";
import SignUp from "#pages/SignUp";
import Login from "#pages/Login";
import MainPage from "#pages/MainPage";
import { useRecoilState } from "recoil";
import { userState } from "#atoms/userState";
import { Route, Routes } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { TIME } from "#constants/time";
import NewCourse from "#pages/NewCourse/NewCourse";
import RecruitDetail from "#pages/RecruitDetail";
import CourseDetail from "#pages/CourseDetail";
import Main from "#pages/MainPage/MainPage";
function App() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refreshRequestTimer, setRefreshRequestTimer] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        const silentLogin = () => {
            setRefreshRequestTimer(
                setTimeout(() => {
                    axios
                        .get("http://localhost:4000/auth/refresh", {
                            withCredentials: true,
                            headers: {
                                Authorization: `Bearer ${userInfo.accessToken}`,
                            },
                        })
                        .then((response: AxiosResponse) => {
                            setUserInfo({
                                accessToken: response.data.data.accessToken,
                                userId: response.data.data.userId,
                            });
                        })
                        .catch();
                }, TIME.ACCESS_TOKEN_EXPIRE_TIME - TIME.MINUTE_IN_SECONDS),
            );

            setRefreshRequestTimer(refreshRequestTimer);
        };

        silentLogin();
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
            <Route path="course">
                <Route path="new" element={<NewCourse />} />
                <Route path="detail" element={<CourseDetail />} />
            </Route>
            <Route path="recruit">
                <Route path="detail" element={<RecruitDetail />} />
            </Route>
            <Route path="main" element={<Main />} />
        </Routes>
    );
}

export default App;
