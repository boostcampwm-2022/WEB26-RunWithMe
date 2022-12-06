import { ChangeEventHandler, useCallback, useState } from "react";

const useMaxPplInput = () => {
    const [maxPpl, setMaxPpl] = useState(1);
    const onChangeMaxPpl: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setMaxPpl(Number(e.target.value));
    }, []);
    return { maxPpl, onChangeMaxPpl };
};

export default useMaxPplInput;
