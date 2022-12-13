import CourseCard from "#components/Card/CourseCard/CourseCard";
import Carousel from "#components/Carousel/Carousel";
import useCoursesQuery from "#hooks/queries/useCoursesQuery";
import { Course } from "#types/Course";

const RecommendCourses = () => {
    const { data } = useCoursesQuery({});
    return (
        <Carousel>
            {data?.pages[0]?.map((c: Course, idx: number) => (
                <CourseCard data={c} key={idx} />
            ))}
        </Carousel>
    );
};

export default RecommendCourses;
