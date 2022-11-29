import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import { Content, Title } from "../RecruitDetail.styles";
import { useParams } from "react-router-dom";
import useHttpPost from "#hooks/http/useHttpPost";
import { useCallback } from "react";
import useShowMap from "#hooks/useShowMap";
import { getPaceFormat } from "#utils/paceUtils";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { getTimeFormat } from "#utils/stringUtils";
import { getMiddlePoint } from "#utils/mapUtils";

const RecruitDetail = () => {
    const { id } = useParams();
    const { post } = useHttpPost();

    const onSubmitJoin = async () => {
        try {
            await post("/recruit/join", {
                recruitId: id,
            });
            alert("참여 완료");
        } catch (error: any) {
            alert(error.message);
        }
    };

    const { data, isLoading } = useRecruitDetailQuery(Number(id));

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 307}px`,
            center: getMiddlePoint(data?.course.path || []),
            runningPath: data?.course.path,
            level: 5,
        }).renderMap,
        [data],
    );
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>404</div>;
    return (
        <>
            <Header text="모집 상세"></Header>
            {renderMap()}
            <Title>{data.title}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{data.course.hDong.name}</p>
                </div>
                <div>
                    <span>총거리</span>
                    <p>{data.course.pathLength}km</p>
                </div>
                <div>
                    <span>페이스</span>
                    <p>{getPaceFormat(data.pace)}/km</p>
                </div>
                <div>
                    <span>집합 일시</span>
                    <p>{getTimeFormat(data.startTime)}</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{data.userId}</p>
                </div>
                <div>
                    <span>참가 현황</span>
                    <p>
                        {data.currentPpl} / {data.maxPpl}
                    </p>
                </div>
                <Button width="fit" onClick={onSubmitJoin}>
                    참여하기
                </Button>
            </Content>
        </>
    );
};

export default RecruitDetail;
