import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import useMap from "#hooks/useMap";
import { Content, Title } from "./CourseDetail.styles";

const CourseDetail = () => {
    const { renderMap } = useMap({
        height: `${window.innerHeight - 330}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });
    return (
        <>
            <Header loggedIn={true} text="코스 상세"></Header>
            {renderMap()}
            <Title>황새울공원 한 바퀴 도는 코스입니다.</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>잠실동 33-3</p>
                </div>
                <div>
                    <span>총 거리</span>
                    <p>3.3km</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>gchoi96</p>
                </div>
                <Button width="fit" onClick={() => alert("코스 모집 모달 on~")}>
                    이 코스로 모집하기
                </Button>
            </Content>
        </>
    );
};

export default CourseDetail;
