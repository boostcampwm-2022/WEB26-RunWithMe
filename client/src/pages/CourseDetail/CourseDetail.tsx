import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useShowMap from "#hooks/useShowMap";
import { getMiddlePoint } from "#utils/pathUtils";
import useCourseDetailQuery from "#hooks/queries/useCourseDetailQuery";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import CourseContent from "#components/CourseContent/CourseContent";
import { flexRow } from "styles/flex";
import CreateRecruitModal from "#components/CreateRecruitForm/CreateRecruitForm";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";

const ButtonWrapper = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.CENTER })};
    width: 100%;
    margin-top: 2rem;
`;

const CourseDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useCourseDetailQuery(Number(id));
    const [showRecruitModal, setShowRecruitModal] = useState(false);

    const renderMap = useCallback(
        useShowMap({
            height: `${window.innerHeight - 273 - 57}px`,
            center: getMiddlePoint(data?.path || []),
            runningPath: data?.path || [],
        }).renderMap,
        [data],
    );

    const handleToggleRecruitModal = () => {
        setShowRecruitModal(!showRecruitModal);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>404</div>;
    // 1. context
    // 2. 전역 모달
    // 3. ?????????
    return (
        <>
            <Header text="코스 상세"></Header>
            {renderMap()}
            <CourseContent data={data} />
            <ButtonWrapper>
                <Button width="fit" onClick={handleToggleRecruitModal}>
                    이 코스로 모집하기
                </Button>
            </ButtonWrapper>
            {showRecruitModal && (
                <CreateRecruitModal
                    modalVisible={showRecruitModal}
                    courseId={data.id}
                    toggleVisible={handleToggleRecruitModal}
                >
                    {ConfirmModal}
                </CreateRecruitModal>
            )}
        </>
    );
};

export default CourseDetail;
