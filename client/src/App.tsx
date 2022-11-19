import React from "react";
import SignUp from "#pages/SignUp";
import Login from "#pages/Login";
import MainPage from "#pages/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
}

export default App;
