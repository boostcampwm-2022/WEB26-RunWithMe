import { loggedInState } from "#atoms/userState";
import useHttpGet from "#hooks/http/useHttpGet";
import HttpResponse from "#types/dto/HttpResponse";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

const useLoggedInMutation = () => {
    const setLoggedIn = useSetRecoilState(loggedInState);
    const { get } = useHttpGet<HttpResponse<{ isLoggedIn: boolean }>>();
    return useMutation(["loggedIn"], async () => get("/auth/check").then((res) => res.data), {
        onSuccess(data) {
            setLoggedIn(data.isLoggedIn);
        },
    });
};

export default useLoggedInMutation;
