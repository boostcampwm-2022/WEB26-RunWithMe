import CourseCard from "#components/Card/CourseCard/CourseCard";
import { MYPAGE } from "#constants/myPageOptions";
import useCoursesQuery from "#hooks/queries/useCoursesQuery";
import { Course } from "#types/Course";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import { MyPageMenuInfo } from "./MyPage.styles";
import { MyPageProps } from "./MyPageTypes";

const CoursesWrapper = styled.div`
    ${flexColumn}
    padding : 10px 30px;
    gap: 10px;
`;

const MyPageCourses = ({ MyPageOption }: MyPageProps) => {
    const { data: course, isLoading: coursesLoading } = useCoursesQuery();
    if (coursesLoading) return <div>Loading...</div>;
    if (!course) return <div>404</div>;

    return (
        <>
            {MyPageOption == MYPAGE.COURSES && (
                <>
                    <MyPageMenuInfo>내가 등록한 코스</MyPageMenuInfo>
                    <CoursesWrapper>
                        {course?.data.map((c: Course, idx: number) => (
                            <CourseCard data={c} key={idx} />
                        ))}
                    </CoursesWrapper>
                </>
            )}
        </>
    );
};

export default MyPageCourses;
