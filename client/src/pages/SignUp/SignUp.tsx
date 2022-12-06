import React, { ChangeEventHandler, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { confirmPasswordValidator, emailValidator, passwordValidator } from "#utils/validationUtils";
import { CheckboxWrapper, InputWrapper, Logo, OptionsWrapper } from "./SignUp.styles";
import { PLACEHOLDER } from "#constants/placeholder";
import usePaceInput from "#hooks/usePaceInput";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import useHttpPost from "#hooks/http/useHttpPost";
import { Address } from "#types/Address";
import AddressSearchInput from "#components/Input/AddressSearchInput/AddressSearchInput";
import PostUserBody from "#types/dto/PostUserBody";
import useUserIdInput from "#hooks/useUserIdInput";

const SignUp = () => {
    const { userId, userIdError, onChangeUserId, onBlurUserId } = useUserIdInput();
    const [email, onChangeEmail, emailError] = useInput(emailValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const [region, setRegion] = useState<Address | null>(null);
    const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
        confirmPasswordValidator(String(password)),
    );
    const [receiveMail, setReceiveMail] = useState(false);
    const { post } = useHttpPost<null, PostUserBody>();
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const navigate = useNavigate();

    const checkFormValidation = () => confirmPassword && password && userId && region?.address.h_code && email;

    const onChangeReceiveMail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setReceiveMail(e.target.checked);
    }, []);

    const onSubmitSignUp = async () => {
        if (!checkFormValidation()) return;
        const userInfo: PostUserBody = {
            userId: userId as string,
            password: password as string,
            hCode: (region && region.address.h_code) || "",
            pace: pace.minute * 60 + pace.second,
            email: email as string,
            receiveMail,
        };
        try {
            await post("/user", userInfo);
            navigate("/", { replace: true });
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <>
            <Header text="회원가입"></Header>
            <Logo>RunWithMe</Logo>
            <InputWrapper>
                <Input placeholder={PLACEHOLDER.ID} type="text" onChange={onChangeUserId} onBlur={onBlurUserId} />
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
                <AddressSearchInput setRegion={setRegion} />
                <Input placeholder={PLACEHOLDER.EMAIL} onChange={onChangeEmail} />
                <span>{emailError}</span>
                <CheckboxWrapper>
                    <input onChange={onChangeReceiveMail} type="checkbox" />
                    <label>이벤트 및 소식 E-mail 수신 동의</label>
                </CheckboxWrapper>
                <Button width="fill" onClick={onSubmitSignUp}>
                    회원가입
                </Button>
            </InputWrapper>
            <OptionsWrapper>
                <span onClick={() => navigate("/pwInquiry")}>비밀번호 찾기</span>
                <span onClick={() => navigate("/login")}>로그인 하기</span>
            </OptionsWrapper>
        </>
    );
};

export default SignUp;
