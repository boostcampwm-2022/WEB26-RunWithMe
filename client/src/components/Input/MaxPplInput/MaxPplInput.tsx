import { ERROR } from "#constants/errorMessage";
import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import { InputWrapper } from "../Input.style";

interface MaxPplInputProps {
    width?: string;
    onChangePpl: ChangeEventHandler<HTMLInputElement>;
}

const MaxPplInput = ({ width, onChangePpl }: MaxPplInputProps) => {
    const onInput: FormEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.currentTarget.value;
        if (Number(value) > 50) {
            alert(ERROR.INVALID_MAXPPL_VALUE);
            e.currentTarget.value = "50";
        }
        if (value.length > 0 && Number(value) < 1) {
            alert(ERROR.INVALID_MAXPPL_VALUE);
            e.currentTarget.value = "1";
        }
    }, []);
    return (
        <InputWrapper width={width ?? "100%"}>
            <input onInput={onInput} onChange={onChangePpl} min="1" max="60" type="number" style={{ width: "100%" }} />
            <p style={{ marginRight: "1rem" }}>명</p>
        </InputWrapper>
    );
};

export default MaxPplInput;
