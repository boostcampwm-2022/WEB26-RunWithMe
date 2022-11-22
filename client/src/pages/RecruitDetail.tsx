import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import useMap from "#hooks/useMap";
import { Content, Title } from "./RecruitDetail.styles";

const RecruitDetail = () => {
    const { renderMap } = useMap({
        height: `${window.innerHeight - 400}px`,
        center: { lat: 33.450701, lng: 126.570667 },
    });
    return (
        <>
            <Header loggedIn={true} text="모집 상세"></Header>
            {renderMap()}
            <Title>달려~달려~</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>잠실동 33-3</p>
                </div>
                <div>
                    <span>페이스</span>
                    <p>3'30"/km</p>
                </div>
                <div>
                    <span>집합 일시</span>
                    <p>2022년 11월 11일 오후 07시</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>gchoi96</p>
                </div>
                <div>
                    <span>참가 현황</span>
                    <p>1 / 5</p>
                </div>
                <Button width="fit" onClick={() => alert("참여 API 날림~")}>
                    참여하기
                </Button>
            </Content>
        </>
    );
};

export default RecruitDetail;