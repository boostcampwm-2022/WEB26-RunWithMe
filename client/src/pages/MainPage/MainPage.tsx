import Header from "#components/Header/Header";
import MoreButton from "#components/MoreButton/MoreButton";
import Slider from "react-slick";
import CourseCard from "#components/Card/CourseCard/CourseCard";
import { CarouselWrapper, ListTitle, MainPageContainer, TitleWrapper } from "./MainPage.styles";
import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCart";

const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const course = {
    title: "황새울공원 한 바퀴 도는 코스입니다.",
    courseId: 5,
    path: [
        { lat: 126.57091836134346, lng: 33.45090000378721 },
        { lat: 126.57004847387998, lng: 33.450635526049844 },
        { lat: 126.56931524544794, lng: 33.45101165404891 },
        { lat: 126.56932224193068, lng: 33.44959616387136 },
        { lat: 126.5700747443057, lng: 33.449670903389 },
        { lat: 126.570502727405, lng: 33.450123187413496 },
    ],
    pathLength: 3355,
    userId: "gchoi96",
    img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
    zipCode: "신림동",
};

const recruit = {
    title: "달려~ 달려~",
    recruitId: 5,
    currentPpl: 1,
    course: {
        title: "황새울공원 한 바퀴 도는 코스입니다.",
        courseId: 5,
        path: [
            { lat: 126.57091836134346, lng: 33.45090000378721 },
            { lat: 126.57004847387998, lng: 33.450635526049844 },
            { lat: 126.56931524544794, lng: 33.45101165404891 },
            { lat: 126.56932224193068, lng: 33.44959616387136 },
            { lat: 126.5700747443057, lng: 33.449670903389 },
            { lat: 126.570502727405, lng: 33.450123187413496 },
        ],
        pathLength: 3355,
        userId: "gchoi96",
        img: "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png",
        zipCode: "신림동",
    },
    startTime: new Date(),
    maxPpl: 4,
    pace: 210,
    authorId: "gchoi96",
};

const MainPage = () => {
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
                            {new Array(10).fill(course).map((c, idx) => (
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
