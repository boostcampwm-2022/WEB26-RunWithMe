import HttpResponse from "#types/dto/HttpResponse";
import PostRecruitBody from "#types/dto/PostRecruitBody";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useHttpPost from "../http/useHttpPost";
type PostRecruitResponse = HttpResponse<{ recruitId: number }>;
const usePostRecruitMutation = () => {
    const { post } = useHttpPost<PostRecruitResponse, PostRecruitBody>();
    const navigate = useNavigate();
    return useMutation<{ recruitId: number }, unknown, PostRecruitBody>(
        (body) => post(`/recruit`, body).then((res) => res.data),
        {
            onSuccess: (res) => navigate(`/recruit/${res.recruitId}`),
        },
    );
};

export default usePostRecruitMutation;
