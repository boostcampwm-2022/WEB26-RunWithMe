import useHttpPost from "#hooks/http/useHttpPost";
import HttpResponse from "#types/dto/HttpResponse";
import { PostCourseBody } from "#types/dto/PostCourseBody";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
type PostCourseResponse = HttpResponse<{ courseId: number }>;
const usePostCourseMutation = () => {
    const { post } = useHttpPost<PostCourseResponse, PostCourseBody>();
    const navigate = useNavigate();
    return useMutation<PostCourseResponse, unknown, PostCourseBody>(
        (body) => post(`/course`, body).then((res) => res.data),
        {
            onSuccess: (res) => navigate(res.data.courseId),
        },
    );
};

export default usePostCourseMutation;
