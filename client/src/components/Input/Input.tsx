import { ChangeEventHandler, ReactNode } from "react";
import { InputWrapper } from "./Input.style";

interface InputProps {
    placeholder?: string;
    type?: "text" | "password" | "number";
    width?: string;
    subText?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ width, type = "text", placeholder, subText, onChange }: InputProps) => {
    return (
        <InputWrapper width={width ?? "100%"}>
            <input
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                style={{ width: subText ? "80%" : "100%" }}
            />
            {subText && <p>{subText}</p>}
        </InputWrapper>
    );
};

export default Input;
