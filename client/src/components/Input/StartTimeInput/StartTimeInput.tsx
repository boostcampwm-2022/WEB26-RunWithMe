import { ERROR } from "#constants/errorMessage";
import { ChangeEventHandler, FormEventHandler, useCallback } from "react";
import { InputWrapper } from "../Input.style";

interface StartTimeInputProps {
    width?: string;
    onChangeTime: ChangeEventHandler<HTMLInputElement>;
}

const StartTimeInput = ({ width, onChangeTime }: StartTimeInputProps) => {
    const nowUtc = Date.now();
    const timeOff = new Date().getTimezoneOffset() * 60000;
    const today = new Date(nowUtc - timeOff).toISOString().substring(0, 16);
    const possibleTime = new Date(nowUtc - timeOff + 1000 * 60 * 60).toISOString().substring(0, 16);

    const onInput: FormEventHandler<HTMLInputElement> = useCallback((e) => {
        const value = e.currentTarget.value;
        const diffMin = (new Date(value).getTime() - new Date().getTime()) / (1000 * 60);
        if (diffMin < 60) {
            alert(ERROR.INVALID_STARTTIME_VALUE);
            e.currentTarget.value = possibleTime;
        }
    }, []);

    return (
        <InputWrapper width={width ?? "100%"}>
            <input onInput={onInput} min={today} onChange={onChangeTime} type="datetime-local"></input>
        </InputWrapper>
    );
};

export default StartTimeInput;
