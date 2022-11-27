import { ChangeEventHandler, useCallback, useState } from "react";

const useStartTimtInput = () => {
    const [startTime, setStartTime] = useState("");
    const onChangeStartTime: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setStartTime(e.target.value);
    }, []);
    return { startTime, onChangeStartTime };
};

export default useStartTimtInput;
