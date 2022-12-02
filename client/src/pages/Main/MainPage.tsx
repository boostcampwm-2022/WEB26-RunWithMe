import Header from "#components/Header/Header";
import MoreButton from "#components/MoreButton/MoreButton";
import Slider, { Settings } from "react-slick";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import { CarouselWrapper, ListTitle, MainPageContainer, TitleWrapper } from "./MainPage.styles";
import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCard";
import useCoursesQuery from "#hooks/queries/useCoursesQuery";
import useRecruitsQuery from "#hooks/queries/useRecruitsQuery";
import { Course } from "#types/Course";
import { Recruit } from "#types/Recruit";

const settings: Settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
};

const MainPage = () => {
    const { data: course, isLoading: coursesLoading } = useCoursesQuery();
    const { data: recruit, isLoading: recruitsLoading } = useRecruitsQuery();
    if (coursesLoading || recruitsLoading) return <div>Loading...</div>;
    if (!course || !recruit) return <div>404</div>;

    return (
        <>
            <Header isMain={true} text="RunWithMe" />
            <MainPageContainer>
                <div>
                    <TitleWrapper>
                        <ListTitle>코스 목록</ListTitle>
                        <MoreButton to="/courses" />
                    </TitleWrapper>
                    <CarouselWrapper>
                        <Slider {...settings}>
                            {course.data.map((c: Course, idx: number) => (
                                <CourseCard data={c} key={idx} />
                            ))}
                        </Slider>
                    </CarouselWrapper>
                </div>
                <div>
                    <TitleWrapper>
                        <ListTitle>모집 목록</ListTitle>
                        <MoreButton to="recruits" />
                    </TitleWrapper>
                    <CarouselWrapper>
                        <Slider {...settings}>
                            {recruit.data.map((r: Recruit, idx: number) => (
                                <RecruitTextCard data={r} key={idx} />
                            ))}
                        </Slider>
                    </CarouselWrapper>
                </div>
            </MainPageContainer>
        </>
    );
};

export default MainPage;
