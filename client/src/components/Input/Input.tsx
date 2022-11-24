import { ChangeEventHandler, ReactNode } from "react";
import { InputWrapper } from "./Input.style";

interface InputProps {
    placeholder?: string;
    type?: "text" | "password" | "number";
    width?: string;
    subText?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    value?: string;
}

const Input = ({ width, type = "text", placeholder, subText, onChange, disabled = false, value }: InputProps) => {
    return (
        <InputWrapper width={width ?? "100%"}>
            <input
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                style={{ width: subText ? "80%" : "100%" }}
                disabled={disabled}
                value={value}
            />
            {subText && <p>{subText}</p>}
        </InputWrapper>
    );
};

export default Input;
