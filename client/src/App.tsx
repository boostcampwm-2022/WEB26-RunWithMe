import React, { useEffect, useState } from "react";
import SignUp from "#pages/SignUp";
import Login from "#pages/Login";
import MainPage from "#pages/MainPage";
import { useRecoilState } from "recoil";
import { userState } from "#atoms/userInfo";
import { Route, Routes } from "react-router-dom";

function App() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refreshRequestTimer, setRefreshRequestTimer] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        const silentLogin = () => {
            setRefreshRequestTimer(
                setTimeout(() => {
                    fetch("/auth/refresh", {
                        method: "GET",
                        credentials: "include",
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            setUserInfo({ accessToken: response.data.accessToken, userId: response.data.userId });
                        })
                        .catch((err) => console.log(err));
                }, 3000),
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
        </Routes>
    );
}

export default App;
