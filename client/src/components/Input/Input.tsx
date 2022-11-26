import { ChangeEventHandler, ReactNode } from "react";
import { InputWrapper } from "./Input.style";

interface InputProps {
    type?: "text" | "password" | "number";
    width?: string;
    child?: ReactNode;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    attr?: object;
}

const Input = ({ width, type = "text", placeholder, child, onChange, attr }: InputProps) => {
    return (
        <InputWrapper width={width ?? "100%"}>
            <input
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                style={{ width: child ? "80%" : "100%" }}
                {...attr}
            />
            {child && <p>{child}</p>}
        </InputWrapper>
    );
};

export default Input;
