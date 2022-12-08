import Header from "#components/Header/Header";
import CourseForm from "#components/CourseForm/CourseForm";

const NewCourse = () => {
    return (
        <>
            <Header text="코스 등록" />
            <CourseForm />
        </>
    );
};

export default NewCourse;
