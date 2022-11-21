import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import useMap from "#hooks/useMap";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import { COLOR } from "styles/color";

export const Title = styled.div`
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    font-size: 2rem;
    font-weight: bold;
    padding: 20px 10px;
`;

export const Content = styled.div`
    ${flexColumn};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 210px;
    padding: 15px 20px;
    div {
        margin-bottom: 10px;
        width: 100%;
        color: ${COLOR.DARK_GRAY};
        display: flex;
        justify-content: space-between;
        p {
            font-weight: 500;
            color: ${COLOR.BLACK};
        }
    }
`;
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
