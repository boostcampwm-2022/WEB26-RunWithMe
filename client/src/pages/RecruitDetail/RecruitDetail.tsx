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
import useHttpDelete from "#hooks/http/useHttpDelete";
import { useNavigate } from "react-router-dom";

const RecruitDetail = () => {
    const { id } = useParams();
    const { data: recruit, isLoading } = useRecruitDetailQuery(Number(id));
    const { post } = useHttpPost<null, { recruitId: string }>();
    const { _delete } = useHttpDelete();
    const navigate = useNavigate();

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 343 - 57}px`,
            center: getMiddlePoint(recruit?.path || []),
            runningPath: recruit?.path || [],
        }).renderMap,
        [recruit],
    );

    const [showJoinConfirmModal, setShowJoinConfirmModal] = useState(false);
    const handleToggleJoinConfirmModal = () => {
        setShowJoinConfirmModal(!showJoinConfirmModal);
    };

    const [showDeleteJoinConfirmModal, setShowDeleteJoinConfirmModal] = useState(false);
    const handleToggleDeleteJoinConfirmModal = () => {
        setShowDeleteJoinConfirmModal(!showDeleteJoinConfirmModal);
    };

    const [showDeleteRecruitConfirmModal, setShowDeleteRecruitConfirmModal] = useState(false);
    const handleToggleDeleteRecruitConfirmModal = () => {
        setShowDeleteRecruitConfirmModal(!showDeleteRecruitConfirmModal);
    };

    const onSubmitJoin = useCallback(async () => {
        try {
            await post(`/recruit/${id}/join`, { recruitId: String(id) });
        } catch (error: any) {
            alert(error.message);
        } finally {
            window.location.reload();
        }
    }, []);

    const onSubmitDeleteRecruit = useCallback(async () => {
        try {
            await _delete(`/recruit/${id}`);
        } catch (error: any) {
            alert(error.message);
        } finally {
            navigate("/");
        }
    }, []);

    const onSubmitDeleteJoin = useCallback(async () => {
        try {
            await _delete(`/recruit/${id}/join`);
        } catch (error: any) {
            alert(error.message);
        } finally {
            window.location.reload();
        }
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    const buttonType = (isParticipating: boolean, isAuthor: boolean) => {
        if (isAuthor)
            return (
                <Button width="fit" onClick={handleToggleDeleteRecruitConfirmModal}>
                    모집 취소
                </Button>
            );
        if (isParticipating)
            return (
                <Button width="fit" onClick={handleToggleDeleteJoinConfirmModal}>
                    참여 취소
                </Button>
            );
        return (
            <Button width="fit" onClick={handleToggleJoinConfirmModal}>
                참여하기
            </Button>
        );
    };

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
                {buttonType(recruit.isParticipating, recruit.isAuthor)}
            </Content>
            <ConfirmModal
                text="참여하시겠습니까?"
                showModal={showJoinConfirmModal}
                handleToggleModal={handleToggleJoinConfirmModal}
                confirmOnClick={onSubmitJoin}
            ></ConfirmModal>
            <ConfirmModal
                text="참여 취소하시겠습니까?"
                showModal={showDeleteJoinConfirmModal}
                handleToggleModal={handleToggleDeleteJoinConfirmModal}
                confirmOnClick={onSubmitDeleteJoin}
            ></ConfirmModal>
            <ConfirmModal
                text="모집 취소하시겠습니까?"
                showModal={showDeleteRecruitConfirmModal}
                handleToggleModal={handleToggleDeleteRecruitConfirmModal}
                confirmOnClick={onSubmitDeleteRecruit}
            ></ConfirmModal>
        </>
    );
};

export default RecruitDetail;
