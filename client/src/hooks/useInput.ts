import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";

type InputValidator = (value: string) => string;

const useInput = (
    validator: InputValidator,
    initialValue = "",
): [string | number | boolean, ChangeEventHandler<HTMLInputElement>, string] => {
    const [value, setValue] = useState<string | number | boolean>(initialValue);
    const [error, setError] = useState<string>("");

    const getDefaultValue = useCallback((inputElement: HTMLInputElement) => {
        const inputType = inputElement.getAttribute("type");
        switch (inputType) {
            case "number":
                return 0;
            case "radio":
                return false;
            case "checkbox":
                return false;
            default:
                return "";
        }
    }, []);

    const getInputValue = useCallback((inputElement: HTMLInputElement) => {
        const inputType = inputElement.getAttribute("type");
        const value = inputElement.value;
        switch (inputType) {
            case "number":
                return Number(value);
            case "radio":
                return inputElement.checked;
            case "checkbox":
                return inputElement.checked;
            default:
                return value;
        }
    }, []);

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setError("");
            const error = validator(e.target.value);
            if (!error) {
                setValue(getInputValue(e.target));
                return;
            }
            setValue(getDefaultValue(e.target));
            setError(error);
            return;
        },
        [validator],
    );

    return [value, onChange, error];
};

export default useInput;
