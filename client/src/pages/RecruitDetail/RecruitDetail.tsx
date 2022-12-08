import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import useShowMap from "#hooks/useShowMap";
import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { getMiddlePoint } from "#utils/mapUtils";
import Header from "#components/Header/Header";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { RecruitDetail } from "#types/RecruitDetail";
import RecruitContent from "#components/RecruitContent/RecruitContent";
import useDeleteJoinMutation from "#hooks/queries/useDeleteJoinMutation";
import useDeleteRecruitMutation from "#hooks/queries/useDeleteRecruitMutation";
import useJoinMutation from "#hooks/queries/useJoinMutation";
interface ModalArgs {
    text: string;
    onClick: () => void;
}

const RecruitDetailPage = () => {
    const { id } = useParams();
    const { data: recruit, isLoading } = useRecruitDetailQuery(Number(id));
    const { mutate: mutateDeleteJoin } = useDeleteJoinMutation(Number(id));
    const { mutate: mutateDeleteRecruit } = useDeleteRecruitMutation(Number(id));
    const { mutate: mutateJoin } = useJoinMutation(Number(id));
    const [modalVisible, setModalVisible] = useState(false);

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 343 - 57}px`,
            center: getMiddlePoint(recruit?.path || []),
            runningPath: recruit?.path || [],
        }).renderMap,
        [recruit],
    );

    const toggleModalVisible = () => {
        setModalVisible((prev) => !prev);
    };

    const getModalArgs = useCallback((recruit: RecruitDetail): ModalArgs => {
        const { isParticipating, isAuthor } = recruit;
        if (isAuthor) return { text: "모집 취소하시겠습니까", onClick: mutateDeleteRecruit };
        if (isParticipating) return { text: "참여 취소하시겠습니까?", onClick: mutateDeleteJoin };
        return { text: "참여하시겠습니까?", onClick: mutateJoin };
    }, []);

    const onClickConfirm = useCallback(
        (recruit: RecruitDetail) => () => {
            getModalArgs(recruit).onClick();
            toggleModalVisible();
        },
        [],
    );

    if (isLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    return (
        <>
            <Header text="모집 상세"></Header>
            {renderMap()}
            <RecruitContent data={recruit} onClick={toggleModalVisible} />
            {modalVisible && (
                <ConfirmModal
                    text={getModalArgs(recruit).text}
                    handleToggleModal={toggleModalVisible}
                    confirmOnClick={onClickConfirm(recruit)}
                ></ConfirmModal>
            )}
        </>
    );
};

export default RecruitDetailPage;
