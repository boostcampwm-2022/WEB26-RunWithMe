import useHttpDelete from "#hooks/http/useHttpDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteJoinMutation = (recruitId: number) => {
    const { _delete } = useHttpDelete();
    const queryClient = useQueryClient();

    return useMutation(() => _delete(`/recruit/${recruitId}/join`), {
        onSuccess: () => queryClient.invalidateQueries(["recruit", recruitId]),
    });
};
export default useDeleteJoinMutation;
