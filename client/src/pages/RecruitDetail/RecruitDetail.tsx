import { useParams } from "react-router-dom";
import useHttpPost from "#hooks/http/useHttpPost";
import { useCallback } from "react";
import useShowMap from "#hooks/useShowMap";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { getMiddlePoint } from "#utils/mapUtils";
import Header from "#components/Header/Header";
import { Content, Title } from "#pages/RecruitDetail.styles";
import { getTimeFormat } from "#utils/stringUtils";
import { getPaceFormat } from "#utils/paceUtils";
import Button from "#components/Button/Button";

const RecruitDetail = () => {
    const { id } = useParams();

    const { data, isLoading } = useRecruitDetailQuery(Number(id));
    const { post } = useHttpPost<null, { recruitId: string }>();
    post("/recruit/join", { recruitId: String(id) });
    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 307}px`,
            center: getMiddlePoint(typeof data?.course.path === "string" ? JSON.parse(data?.course.path || `[]`) : []),
            runningPath: typeof data?.course.path === "string" ? JSON.parse(data?.course.path || `[]`) : [],
            level: 5,
        }).renderMap,
        [data],
    );

    const onSubmitJoin = useCallback(async () => {
        try {
            await post("/recruit/join", { recruitId: String(id) });
        } catch {}
    }, []);

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
