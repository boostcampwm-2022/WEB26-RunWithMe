import useHttpPost from "#hooks/http/useHttpPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useJoinMutation = (recruitId: number) => {
    const { post } = useHttpPost<null, { recruitId: string }>();
    const queryClient = useQueryClient();
    return useMutation(() => post(`/recruit/join`, { recruitId: String(recruitId) }), {
        onSuccess: () => queryClient.invalidateQueries(["recruit", recruitId]),
    });
};
export default useJoinMutation;
