import React, { ChangeEvent, MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import useInput from "#hooks/useInput";
import { confirmPasswordValidator, idValidator, passwordValidator } from "#utils/valitationUtils";
import { InputWrapper, LogoWrapper, OptionsWrapper } from "./SignUp.styles";
import { PLACEHOLDER } from "#constants/placeholder";
import usePaceInput from "#hooks/usePaceInput";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import useHttpPost from "#hooks/http/useHttpPost";
import useLocalAPI from "#hooks/useLocalAPI";
import { LocalData, LocalSearchResponse } from "#types/Local";
import ResetButton from "#components/ResetButton/ResetButton";
import AddressList from "#components/AddressList/AddressList";
import { debounce } from "#utils/timerUtils";

const SignUp = () => {
    const [userId, onChangeUserId, userIdError] = useInput(idValidator);
    const [password, onChangePassword, passwordError] = useInput(passwordValidator);
    const [confirmPassword, onChangeConfirmPassword, confirmPasswordError] = useInput(
        confirmPasswordValidator(String(password)),
    );
    const query = useLocalAPI<LocalSearchResponse>("/search/address.json");
    const [searchResult, setSearchResult] = useState<LocalData[]>([]);
    const [hDong, setHDong] = useState({ name: "", code: "" });
    const { post } = useHttpPost();
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const navigate = useNavigate();

    const checkFormValidation = () => confirmPassword && password && userId && hDong.code;

    const onSubmitSignUp = async () => {
        if (!checkFormValidation()) return;
        try {
            await post("/user", { userId, password, hCode: hDong.code, pace: pace.minute * 60 + pace.second });
            navigate("/", { replace: true });
        } catch (error: any) {
            alert(error.message);
        }
    };

    const onClickLocalData = useCallback(
        (local: LocalData): MouseEventHandler<HTMLDivElement> =>
            () => {
                setHDong({ name: local.address_name, code: local.address.h_code });
                setSearchResult([]);
            },
        [],
    );

    const onChangeHName = (e: ChangeEvent<HTMLInputElement>) => setHDong((prev) => ({ ...prev, name: e.target.value }));

    const onClickResetButton = useCallback(() => {
        setHDong({ name: "", code: "" });
    }, []);

    useEffect(() => {
        if (hDong.code) return;
        (async () => {
            const result = await query({ analyze_type: "exact", size: 20, query: hDong.name });
            setSearchResult(result.documents.filter(isEupMyeonDong));
        })();
    }, [hDong]);

    const isEupMyeonDong = useCallback((local: LocalData) => {
        return local.address_type === "REGION" && local.address.region_3depth_h_name;
    }, []);

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
                <div style={{ width: "100%", position: "relative" }}>
                    <Input
                        placeholder={PLACEHOLDER.ZIP_CODE}
                        value={hDong.name}
                        onChange={onChangeHName}
                        disabled={hDong.code.length > 0}
                        subText={hDong.code.length > 0 && <ResetButton width="1.2rem" onClick={onClickResetButton} />}
                    />
                    {searchResult.length > 0 && <AddressList data={searchResult} onClickLocal={onClickLocalData} />}
                </div>
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
