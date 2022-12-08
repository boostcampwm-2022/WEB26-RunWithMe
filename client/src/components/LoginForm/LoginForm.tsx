import Button from "#components/Button/Button";
import Input from "#components/Input/Input";
import { PLACEHOLDER } from "#constants/placeholder";
import useHttpPost from "#hooks/http/useHttpPost";
import useInput from "#hooks/useInput";
import useLogin from "#hooks/useLogin";
import { idValidator, passwordValidator } from "#utils/validationUtils";
import { useNavigate } from "react-router-dom";
import { LoginFormContainer } from "./LoginForm.styles";

const LoginForm = () => {
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
        <LoginFormContainer>
            <Input placeholder={PLACEHOLDER.ID} type="text" onChange={onChangeUserId}></Input>
            <span>{userIdError}</span>
            <Input placeholder={PLACEHOLDER.PASSWORD} type="password" onChange={onChangePassword}></Input>
            <span>{passwordError}</span>
            <Button width="fill" onClick={onSubmitLogin}>
                로그인
            </Button>
        </LoginFormContainer>
    );
};

export default LoginForm;
