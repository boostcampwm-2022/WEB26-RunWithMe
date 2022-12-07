import { ERROR } from "#constants/errorMessage";
import { idValidator } from "#utils/validationUtils";
import { ChangeEvent, useCallback, useState } from "react";
import useHttpGet from "./http/useHttpGet";

const useUserIdInput = () => {
    const [userId, setUserId] = useState("");
    const [userIdError, setUserIdError] = useState("");
    const { get } = useHttpGet<{ statusCode: number; exists: boolean }>();
    const onChangeUserId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserIdError("");
        const error = idValidator(e.target.value);
        if (!error) {
            setUserId(e.target.value);
            return;
        }
        setUserId("");
        setUserIdError(error);
        return;
    }, []);

    const onBlurUserId = useCallback(async () => {
        if (!userId) return;
        const result = await get(`/user/${userId}`);
        setUserIdError(result.exists ? ERROR.DUPLICATED_USER_ID : "");
    }, [userId]);

    return { userId, userIdError, onChangeUserId, onBlurUserId };
};
export default useUserIdInput;
