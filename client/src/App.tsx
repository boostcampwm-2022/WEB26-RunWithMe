import React, { useEffect, useState } from "react";
import SignUp from "#pages/SignUp";
import Login from "#pages/Login";
import MainPage from "#pages/MainPage";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { userState } from "#atoms/userInfo";
import { Route, Routes } from "react-router-dom";

function App() {
    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [refreshRequestTimer, setRefreshRequestTimer] = useState<NodeJS.Timer | null>(null);
    useEffect(() => {
        if (!userInfo) return;
        const silentLogin = () => {
            setRefreshRequestTimer(
                setTimeout(() => {
                    console.log("refresh request");
                    axios
                        .get("http://localhost:4000/auth/refresh", {
                            headers: {
                                Authorization: `Bearer ${userInfo.accessToken}`,
                            },
                        })
                        .then((res: AxiosResponse) => {
                            console.log(res.data.accessToken);
                            setUserInfo(res.data.accessToken);
                        })
                        .catch();
                }, 5000),
            );

            setRefreshRequestTimer(refreshRequestTimer);
        };
        silentLogin();

        // setTimeout으로 했다치면
        // 뭔가를 해서 axios 보내서 받아왔음 -> 함수로
        // 이거를 setUserInfo를 통해서 저장했음 -> 하나의 함수로

        // return 을 통해 clearTimeout을 해주자
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
