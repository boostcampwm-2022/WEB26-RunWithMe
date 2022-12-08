import useHttpDelete from "#hooks/http/useHttpDelete";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useDeleteRecruitMutation = (recruitId: number) => {
    const { _delete } = useHttpDelete();
    const navigate = useNavigate();
    return useMutation(() => _delete(`/recruit/${recruitId}`), {
        onMutate: () => navigate("/"),
    });
};

export default useDeleteRecruitMutation;
