import { ChangeEventHandler, useState } from "react";

interface UseInputProps {
    type?: "string" | "number";
}

type InputValidator = (value: string) => string;

const useInput = ({ type = "string" }: UseInputProps): any => {
    const [value, setValue] = useState(type === "number" ? 0 : "");
    const [error, setError] = useState<string>("");

    const onChange =
        (validator: InputValidator): ChangeEventHandler<HTMLInputElement> =>
        (e) => {
            setError("");
            const error = validator(e.target.value);
            if (error) {
                setError(error);
                return;
            }
            setValue(type === "number" ? Number(e.target.value) : e.target.value);
        };

    return [value, onChange, error];
};

export default useInput;
