import CourseCard from "#components/Card/CourseCard/CourseCard";
import Carousel from "#components/Carousel/Carousel";
import MoreButton from "#components/MoreButton/MoreButton";
import useCoursesQuery from "#hooks/queries/useCoursesQuery";
import { Course } from "#types/Course";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontXLarge } from "styles/font";
const TitleWrapper = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    padding: 0px 10px;
    > span {
        ${fontXLarge(COLOR.BLACK, 500)};
    }
`;

const RecommendCourses = () => {
    const { data } = useCoursesQuery({});
    return (
        <div>
            <TitleWrapper>
                <span>코스 목록</span>
                <MoreButton to="/courses" />
            </TitleWrapper>
            <Carousel>
                {data?.pages[0].map((c: Course, idx: number) => (
                    <CourseCard data={c} key={idx} />
                ))}
            </Carousel>
        </div>
    );
};

export default RecommendCourses;
