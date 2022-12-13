import Header from "#components/Header/Header";
import CourseForm from "#components/CourseForm/CourseForm";
import useAuth from "#hooks/useAuth";

const NewCourse = () => {
    useAuth();
    return (
        <>
            <Header text="코스 등록" />
            <CourseForm />
        </>
    );
};

export default NewCourse;
