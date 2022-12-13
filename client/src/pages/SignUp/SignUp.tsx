import Header from "#components/Header/Header";
import { Logo } from "./SignUp.styles";

import SignUpForm from "#components/SignUpForm/SignUpForm";
import Navigator from "#components/Navigator/Navigator";
import useAuth from "#hooks/useAuth";

const SignUp = () => {
    useAuth(false);
    return (
        <>
            <Header text="회원가입"></Header>
            <Logo>RunWithMe</Logo>
            <SignUpForm />
            <Navigator
                path={[
                    { to: "pwInquiry", text: "비밀번호 찾기" },
                    { to: "login", text: "로그인 하기" },
                ]}
            />
        </>
    );
};

export default SignUp;
