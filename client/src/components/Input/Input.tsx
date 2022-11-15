import { ChangeEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { COLOR } from "styles/color";

interface InputProps {
    placeholder?: string;
    type?: "text" | "password" | "number";
    width?: string;
    subText?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputWrapper = styled.div<{ width: string }>`
    display: flex;
    padding: 16px;
    border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    width: ${({ width }) => width};
    input {
        color: ${COLOR.BLACK};
        border: none;
        :focus {
            outline: none;
        }
        ::placeholder {
            color: ${COLOR.BABY_BLUE};
        }
        /* Chrome, Safari, Edge, Opera */
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        /* Firefox */
        [type="number"] {
            -moz-appearance: textfield;
        }
    }
    p {
        color: ${COLOR.BABY_BLUE};
        text-align: right;
        width: 20%;
    }
`;

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
