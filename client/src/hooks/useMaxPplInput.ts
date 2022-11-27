import { ChangeEventHandler, useCallback, useState } from "react";

const useMaxPplInput = () => {
    const [maxPpl, setMaxPpl] = useState(0);
    const onChangeMaxPpl: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setMaxPpl(Number(e.target.value));
    }, []);
    return { maxPpl, onChangeMaxPpl };
};

export default useMaxPplInput;
