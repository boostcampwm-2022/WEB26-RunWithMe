import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { PLACEHOLDER } from "#constants/placeholder";
import { idValidator, passwordValidator } from "#utils/validationUtils";

import { useSetRecoilState } from "recoil";
import { InputWrapper, OptionsWrapper } from "./SignUp.styles";
import { userState } from "#atoms/userState";

import { LogoWrapper } from "./Login.styles";
import useHttpPost from "#hooks/http/useHttpPost";

const Login = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const { post } = useHttpPost();
    const setUserInfo = useSetRecoilState(userState);
    const navigate = useNavigate();

    const checkFormValidation = () => {
        return userId && password;
    };

    const onSubmitLogin = async () => {
        if (!checkFormValidation()) return;
        try {
            const response = await post("/auth/login", { userId, password });
            setUserInfo(response.data);
            navigate("/");
        } catch (error: any) {
            alert(error.message);
        }
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
