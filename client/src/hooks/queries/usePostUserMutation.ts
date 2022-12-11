import useHttpPost from "#hooks/http/useHttpPost";
import HttpResponse from "#types/dto/HttpResponse";
import PostUserBody from "#types/dto/PostUserBody";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const usePostUserMutation = () => {
    const { post } = useHttpPost<HttpResponse<null>, PostUserBody>();
    const navigate = useNavigate();
    return useMutation<unknown, unknown, PostUserBody>((body) => post(`/user`, body).then((res) => res.data), {
        onSuccess: () => navigate(`/`),
    });
};

export default usePostUserMutation;
