import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import axios from "axios";
import { PLACEHOLDER } from "#constants/constants";
import { idValidator, passwordValidator } from "#utils/valitationUtils";

import { InputWrapper, OptionsWrapper } from "./SignUp.styles";

import { LogoWrapper } from "./Login.styles";

const Login = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);

    const navigate = useNavigate();

    const checkFormValidation = useCallback(() => {
        return userIdError || passwordError;
    }, [userIdError, passwordError]);

    const onSubmitLogin = () => {
        if (checkFormValidation()) return;
        axios
            .post("http://localhost:4000/auth/login", {
                userId,
                password,
            })
            .then((res) => res.status === 201 && navigate("/", { replace: true }))
            .catch(console.log);
    };

    return (
        <>
            <Header text="로그인" />
            <LogoWrapper>RunWithMe</LogoWrapper>
            <InputWrapper>
                <Input placeholder={PLACEHOLDER.ID} type="text" onChange={onChangeUserId}></Input>
                <span>{userIdError}</span>
                <Input placeholder={PLACEHOLDER.PASSWORD} type="password" onChange={onChangePassword}></Input>
                <span>{passwordError}</span>
                <Button width="fill" onClick={onSubmitLogin}>
                    로그인
                </Button>
            </InputWrapper>
            <OptionsWrapper>
                <div>
                    <span onClick={() => navigate("/pwInquiry")}>비밀번호 찾기</span>
                </div>
                <div>
                    <span onClick={() => navigate("/signup")}>회원가입</span>
                </div>
            </OptionsWrapper>
        </>
    );
};

export default Login;
