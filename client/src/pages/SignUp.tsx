import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "#components/Header/Header";
import Input from "#components/Input/Input";
import Button from "#components/Button/Button";
import axios from "axios";

const LogoWrapper = styled.div`
    color: black;
    width: 90%;
    height: 29px;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: "Noto Sans KR";
    margin: auto;
    padding: 5rem;
    text-align: center;
`;

const InputWrapper = styled.div`
    padding: 4rem;
    width: 90%;
    margin: auto;
    div {
        display: block;
        margin: auto;

        input {
            font-size: 1.4rem;
        }
    }

    span {
        color: red;
        float: left;
        font-size: 1rem;
    }

    button {
        margin-top: 2.5rem;
    }
`;

const OptionsWrapper = styled.div`
    color: grey;
    display: flex;
    margin: auto;
    width: 60%;

    div {
        justify-content: center;
        flex-grow: 1;
        padding: 0.1rem 0.9rem;
        cursor: pointer;
    }

    div:first-child {
        border-right: 0.1rem solid grey;
    }
`;

const SignUp = () => {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPw, setConfirmPw] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [pace, setPace] = useState<number>(0);

    const [isValidId, setIsValidId] = useState<boolean>(false);
    const [isValidConfirmPw, setIsValidConfirmPw] = useState<boolean>(false);
    const [isValidZipCode, setIsValidZipCode] = useState<boolean>(false);

    const navigate = useNavigate();

    const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
        if (e.target.value.length > 20 || e.target.value.length < 6) {
            setIsValidId(false);
        } else {
            setIsValidId(true);
        }
    };

    const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value === confirmPw && confirmPw !== "" && e.target.value !== "") {
            setIsValidConfirmPw(true);
            return;
        }
        setIsValidConfirmPw(false);
    };

    const onChangeConfirmPw = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPw(e.target.value);
        if (password === e.target.value && password !== "" && e.target.value !== "") {
            setIsValidConfirmPw(true);
            return;
        }
        setIsValidConfirmPw(false);
    };

    const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value);
        if (e.target.value.length != 5) {
            setIsValidZipCode(false);
            return;
        }
        setIsValidZipCode(true);
    };

    const onChangePace = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pace = Number(e.target.value);
        setPace(pace);
    };

    const onSubmit = () => {
        if (!isValidId || !isValidConfirmPw || !isValidZipCode) return;
        axios
            .post("http://localhost:4000/user", {
                userId,
                password,
                pace,
                zipCode,
            })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header loggedIn={false} text="회원가입"></Header>
            <LogoWrapper>RunWithMe</LogoWrapper>
            <InputWrapper>
                <Input placeholder="아이디를 입력하세요" type="text" onChange={onChangeId}></Input>
                {userId.length != 0 && !isValidId && <span>아이디는 6자 이상 20자 미만이여야 합니다.</span>}
                <Input placeholder="비밀번호를 입력하세요" type="password" onChange={onChangePw}></Input>
                <Input placeholder="비밀번호를 한번 더 입력하세요" type="password" onChange={onChangeConfirmPw}></Input>
                {confirmPw.length != 0 && !isValidConfirmPw && <span>비밀번호가 일치하지 않습니다.</span>}
                <Input placeholder="페이스를 입력하세요" type="number" onChange={onChangePace}></Input>
                <Input placeholder="지역을 입력하세요" type="number" onChange={onChangeZipCode}></Input>
                {zipCode.length != 0 && !isValidZipCode && <span>우편번호는 5자리여야 합니다.</span>}
                <Button width="fill" onClick={onSubmit}>
                    회원가입
                </Button>
            </InputWrapper>
            <OptionsWrapper>
                <div onClick={() => navigate("/pwInquiry")}>비밀번호 찾기</div>
                <div onClick={() => navigate("/login")}>로그인 하기</div>
            </OptionsWrapper>
        </>
    );
};

export default SignUp;
