import Header from "#components/Header/Header";
import { LogoWrapper } from "./Login.styles";
import Navigator from "#components/Navigator/Navigator";
import LoginForm from "#components/LoginForm/LoginForm";
import useAuth from "#hooks/useAuth";
import usePreload from "#hooks/usePreload";
import { SignUp } from "#pages/index";

const Login = () => {
    useAuth(false);
    usePreload(SignUp);
    return (
        <>
            <Header text="로그인" />
            <LogoWrapper>RunWithMe</LogoWrapper>
            <LoginForm />
            <Navigator
                path={[
                    { to: "pwInquiry", text: "비밀번호 찾기" },
                    { to: "signup", text: "회원가입" },
                ]}
            />
        </>
    );
};

export default Login;
