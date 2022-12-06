import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { confirmPasswordValidator, idValidator, passwordValidator } from "#utils/validationUtils";
import { InputWrapper, Logo, OptionsWrapper } from "./SignUp.styles";
import { PLACEHOLDER } from "#constants/placeholder";
import usePaceInput from "#hooks/usePaceInput";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import useHttpPost from "#hooks/http/useHttpPost";
import { Address } from "#types/Address";
import AddressSearchInput from "#components/Input/AddressSearchInput/AddressSearchInput";
import PostUserBody from "#types/dto/PostUserBody";

const SignUp = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const [region, setRegion] = useState<Address | null>(null);
    const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
        confirmPasswordValidator(String(password)),
    );
    const { post } = useHttpPost<null, PostUserBody>();
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const navigate = useNavigate();

    const checkFormValidation = () => confirmPassword && password && userId && region?.address.h_code;

    const onSubmitSignUp = async () => {
        if (!checkFormValidation()) return;
        const userInfo: PostUserBody = {
            userId: userId as string,
            password: password as string,
            hCode: (region && region.address.h_code) || "",
            pace: pace.minute * 60 + pace.second,
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
                <AddressSearchInput setRegion={setRegion} />
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
