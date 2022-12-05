import { useParams } from "react-router-dom";
import useHttpPost from "#hooks/http/useHttpPost";
import { useCallback, useState } from "react";
import useShowMap from "#hooks/useShowMap";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { getMiddlePoint } from "#utils/mapUtils";
import Header from "#components/Header/Header";
import { Content, Title } from "#pages/RecruitDetail.styles";
import { getTimeFormat } from "#utils/stringUtils";
import { getPaceFormat } from "#utils/paceUtils";
import Button from "#components/Button/Button";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";

const RecruitDetail = () => {
    const { id } = useParams();
    const { data: recruit, isLoading } = useRecruitDetailQuery(Number(id));
    const { post } = useHttpPost<null, { recruitId: string }>();

    if (isLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 343 - 57}px`,
            center: getMiddlePoint(recruit?.path || []),
            runningPath: recruit?.path || [],
        }).renderMap,
        [recruit],
    );

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleToggleConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const onSubmitJoin = useCallback(async () => {
        try {
            await post("/recruit/join", { recruitId: String(id) });
        } catch (error: any) {
            alert(error.message);
        } finally {
            window.location.reload();
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    return (
        <>
            <Header text="모집 상세"></Header>
            {renderMap()}
            <Title>{recruit.title}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{recruit.hDong.name}</p>
                </div>
                <div>
                    <span>총거리</span>
                    <p>{recruit.pathLength}km</p>
                </div>
                <div>
                    <span>페이스</span>
                    <p>{getPaceFormat(recruit.pace)}/km</p>
                </div>
                <div>
                    <span>집합 일시</span>
                    <p>{getTimeFormat(recruit.startTime)}</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{recruit.userId}</p>
                </div>
                <div>
                    <span>참가 현황</span>
                    <p>
                        {recruit.currentPpl} / {recruit.maxPpl}
                    </p>
                </div>
                <Button width="fit" onClick={handleToggleConfirmModal}>
                    참여하기
                </Button>
            </Content>
            <ConfirmModal
                text="참여 하시겠습니까?"
                showModal={showConfirmModal}
                handleToggleModal={handleToggleConfirmModal}
                confirmOnClick={onSubmitJoin}
            ></ConfirmModal>
        </>
    );
};

export default RecruitDetail;
