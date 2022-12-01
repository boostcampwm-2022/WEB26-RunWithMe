import { Course } from "#types/Course";

interface GetCoursesRes {
    statusCode: number;
    data: Course[];
}

export default GetCoursesRes;
