import { ChangeEventHandler, useCallback, useState } from "react";

const usePaceInput = () => {
    const [pace, setPace] = useState({ minute: 0, second: 0 });
    const onChangeMinute: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPace((prev) => ({ ...prev, minute: Number(e.target.value) }));
    }, []);

    const onChangeSecond: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPace((prev) => ({ ...prev, second: Number(e.target.value) }));
    }, []);
    return { pace, onChangeMinute, onChangeSecond };
};

export default usePaceInput;
