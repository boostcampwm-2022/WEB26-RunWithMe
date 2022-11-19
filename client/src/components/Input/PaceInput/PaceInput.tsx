import { ERROR } from "#constants/errorMessage";
import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import { InputWrapper } from "../Input.style";

interface PaceInputProps {
    width?: string;
    onChangeMinute: ChangeEventHandler<HTMLInputElement>;
    onChangeSecond: ChangeEventHandler<HTMLInputElement>;
}

const PaceInput = ({ width, onChangeMinute, onChangeSecond }: PaceInputProps) => {
    const onInput: FormEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.currentTarget.value;
        if (value.length > 1 && value[0] === "0") {
            e.currentTarget.value = value.slice(1);
        }
        if (Number(value) > 60) {
            alert(ERROR.INVALID_MINUTE_VALUE);
            e.currentTarget.value = "60";
        }
        if (Number(value) < 0) {
            alert(ERROR.INVALID_MINUTE_VALUE);
            e.currentTarget.value = "0";
        }
    }, []);
    return (
        <InputWrapper width={width ?? "100%"}>
            <input
                onInput={onInput}
                onChange={onChangeMinute}
                min="1"
                max="60"
                type="number"
                style={{ width: "40%" }}
            />
            <p style={{ marginRight: "1rem" }}>분</p>
            <input
                onInput={onInput}
                onChange={onChangeSecond}
                min="1"
                max="60"
                type="number"
                style={{ width: "40%" }}
            />
            <p style={{ marginRight: "1rem" }}>초</p>
            <p>/km</p>
        </InputWrapper>
    );
};

export default PaceInput;
