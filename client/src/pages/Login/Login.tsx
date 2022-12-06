import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { PLACEHOLDER } from "#constants/placeholder";
import { idValidator, passwordValidator } from "#utils/validationUtils";
import { LogoWrapper } from "./Login.styles";
import useHttpPost from "#hooks/http/useHttpPost";
import { InputWrapper, OptionsWrapper } from "#pages/SignUp/SignUp.styles";
import useLogin from "#hooks/useLogin";

const Login = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const { post } = useHttpPost();
    const login = useLogin();
    const navigate = useNavigate();

    const checkFormValidation = () => {
        return userId && password;
    };

    const onSubmitLogin = async () => {
        if (!checkFormValidation()) return;
        try {
            const response: any = await post("/auth/login", { userId, password });
            login(response.data);
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
