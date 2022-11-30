import Header from "#components/Header/Header";
import MoreButton from "#components/MoreButton/MoreButton";
import Slider, { Settings } from "react-slick";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import { CarouselWrapper, ListTitle, MainPageContainer, TitleWrapper } from "./MainPage.styles";
import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCard";
import useCoursesQuery from "#hooks/queries/useCoursesQuery";
import { recruit } from "./MainPage.data";
import { useEffect } from "react";

const settings: Settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
};

const MainPage = () => {
    const { data: course, isLoading } = useCoursesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (!course) return <div>404</div>;

    return (
        <>
            <Header isMain={true} text="RunWithMe" />
            <MainPageContainer>
                <div>
                    <TitleWrapper>
                        <ListTitle>코스 목록</ListTitle>
                        <MoreButton to="/course" />
                    </TitleWrapper>
                    <CarouselWrapper>
                        <Slider {...settings}>
                            {course.data.map((c: any, idx: any) => (
                                <CourseCard data={c} key={idx} />
                            ))}
                        </Slider>
                    </CarouselWrapper>
                </div>
                <div>
                    <TitleWrapper>
                        <ListTitle>모집 목록</ListTitle>
                        <MoreButton to="recruit" />
                    </TitleWrapper>
                    <CarouselWrapper>
                        <Slider {...settings}>
                            {new Array(10).fill(recruit).map((r, idx) => (
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
