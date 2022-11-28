import { ChangeEventHandler, useCallback, useState } from "react";

const useStartTimeInput = () => {
    const [startTime, setStartTime] = useState("");
    const onChangeStartTime: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setStartTime(e.target.value);
    }, []);
    return { startTime, onChangeStartTime };
};

export default useStartTimeInput;
