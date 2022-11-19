import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import axios from "axios";
import useInput from "#hooks/useInput";
import { confirmPasswordValidator, idValidator, passwordValidator, zipCodeValidator } from "#utils/valitationUtils";
import { InputWrapper, LogoWrapper, OptionsWrapper } from "./SignUp.styles";
import { PLACEHOLDER } from "#constants/constants";

const SignUp = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
        confirmPasswordValidator(String(password)),
    );
    const [zipCode, onChangeZipCode, zipCodeError] = useInput(zipCodeValidator);
    const [pace, onChangePace] = useInput(() => "", true);

    const navigate = useNavigate();

    const checkFormValidation = useCallback(() => {
        return userIdError || passwordError || confirmPasswordError || !confirmPassword;
    }, [userIdError, passwordError, confirmPasswordError]);

    const onSubmitSignUp = () => {
        if (checkFormValidation()) return;
        axios
            .post("http://localhost:4000/user", {
                userId,
                password,
                pace,
                zipCode,
            })
            .then((res) => res.status === 201 && navigate("/", { replace: true }))
            .catch(console.log);
    };

    return (
        <>
            <Header loggedIn={false} text="회원가입"></Header>
            <LogoWrapper>RunWithMe</LogoWrapper>
            <InputWrapper>
                <Input placeholder={PLACEHOLDER.ID} type="text" onChange={onChangeUserId}></Input>
                <span>{userIdError}</span>
                <Input placeholder={PLACEHOLDER.PASSWORD} type="password" onChange={onChangePassword}></Input>
                <span>{passwordError}</span>
                <Input
                    placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
                    type="password"
                    onChange={onChangeConfirmPassword}
                ></Input>
                <span>{confirmPasswordError}</span>
                <Input placeholder={PLACEHOLDER.PACE} type="number" onChange={onChangePace}></Input>
                <Input placeholder={PLACEHOLDER.ZIP_CODE} type="number" onChange={onChangeZipCode}></Input>
                <span>{zipCodeError}</span>
                <Button width="fill" onClick={onSubmitSignUp}>
                    회원가입
                </Button>
            </InputWrapper>
            <OptionsWrapper>
                <div>
                    <span onClick={() => navigate("/pwInquiry")}>비밀번호 찾기</span>
                </div>
                <div>
                    <span onClick={() => navigate("/login")}>로그인 하기</span>
                </div>
            </OptionsWrapper>
        </>
    );
};

export default SignUp;
