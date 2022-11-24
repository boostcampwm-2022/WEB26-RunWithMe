import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { confirmPasswordValidator, idValidator, passwordValidator, hCodeValidator } from "#utils/valitationUtils";
import { InputWrapper, LogoWrapper, OptionsWrapper } from "./SignUp.styles";
import { PLACEHOLDER } from "#constants/placeholder";
import usePaceInput from "#hooks/usePaceInput";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import useHttpPost from "#hooks/http/useHttpPost";

const SignUp = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
        confirmPasswordValidator(String(password)),
    );
    const { post } = useHttpPost();
    const [hCode, onChangeHCode, hCodeError] = useInput(hCodeValidator);
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const navigate = useNavigate();

    const checkFormValidation = () => confirmPassword && password && userId && hCode;

    const onSubmitSignUp = async () => {
        if (!checkFormValidation()) return;
        try {
            await post("/user", { userId, password, hCode, pace: pace.minute * 60 + pace.second });
            navigate("/", { replace: true });
        } catch (error: any) {
            alert(error.message);
        }
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
                <PaceInput onChangeMinute={onChangeMinute} onChangeSecond={onChangeSecond}></PaceInput>
                <Input placeholder={PLACEHOLDER.ZIP_CODE} type="number" onChange={onChangeHCode}></Input>
                <span>{hCodeError}</span>
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
