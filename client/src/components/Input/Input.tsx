import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";
import { InputWrapper } from "./Input.style";

interface InputProps {
    type?: "text" | "password" | "number" | "checkbox";
    width?: string;
    child?: ReactNode;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    attr?: object;
}

const Input = ({ width, type = "text", placeholder, child, onChange, onBlur, attr }: InputProps) => {
    return (
        <InputWrapper width={width ?? "100%"}>
            <input
                onBlur={onBlur}
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
