import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";

type InputValidator = (value: string) => string;

const useInput = (
    validator: InputValidator,
    isNumber?: boolean,
): [string | number, ChangeEventHandler<HTMLInputElement>, string] => {
    const [value, setValue] = useState(isNumber ? 0 : "");
    const [error, setError] = useState<string>("");

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setError("");
            const error = validator(e.target.value);
            if (error) {
                setError(error);
                return;
            }
            setValue(isNumber ? Number(e.target.value) : e.target.value);
        },
        [validator],
    );

    return [value, onChange, error];
};

export default useInput;
