import Header from "#components/Header/Header";
import Button from "#components/Button/Button";
import { Content, Title } from "./CourseDetail.styles";
import Modal from "#components/Modal/Modal";
import { useCallback, useState } from "react";
import Input from "#components/Input/Input";
import { COLOR } from "styles/color";
import styled from "styled-components";
import { flexRowSpaceAround } from "styles/flex";
import { PLACEHOLDER } from "#constants/placeholder";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import usePaceInput from "#hooks/usePaceInput";
import useInput from "#hooks/useInput";
import { recruitTitleValidator } from "#utils/validationUtils";
import useHttpPost from "#hooks/http/useHttpPost";
import { useNavigate, useParams } from "react-router-dom";
import StartTimeInput from "#components/Input/StartTimeInput/StartTimeInput";
import MaxPplInput from "#components/Input/MaxPplInput/MaxPplInput";
import useStartTimeInput from "#hooks/useStartTimeInput";
import useMaxPplInput from "#hooks/useMaxPplInput";
import { InputWrapper } from "#pages/SignUp/SignUp.styles";
import useShowMap from "#hooks/useShowMap";
import { getMiddlePoint } from "#utils/pathUtils";
import useCourseDetailQuery from "#hooks/queries/useCourseDetailQuery";
import ConfirmModal from "#components/ConfirmModal/ConfirmModal";
import { useRecoilValue } from "recoil";
import { userState } from "#atoms/userState";

const Buttons = styled.div`
    ${flexRowSpaceAround}
    padding-top: 16px;
`;

const CourseDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useCourseDetailQuery(Number(id));

    const [title, onChangeTitle, titleError] = useInput(recruitTitleValidator);
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const { startTime, onChangeStartTime } = useStartTimeInput();
    const { maxPpl, onChangeMaxPpl } = useMaxPplInput();

    const renderMap = useCallback(
        useShowMap({
            height: `70vh`,
            center: getMiddlePoint(data?.path || []),
            runningPath: data?.path || [],
        }).renderMap,
        [data],
    );

    const checkFormValidation = () => {
        if (title && startTime && pace) {
            handleToggleConfirmModal();
        }
    };

    const [showRecruitModal, setShowRecruitModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { post } = useHttpPost();
    const navigate = useNavigate();

    const handleToggleRecruitModal = () => {
        setShowRecruitModal(!showRecruitModal);
    };

    const handleToggleConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const onSubmitRecruit = async () => {
        try {
            const { data }: { data: any } = await post("/recruit", {
                title,
                courseId: id,
                startTime,
                maxPpl,
                pace: pace.minute * 60 + pace.second,
            });

            navigate(`/recruit/${data.recruitId}`);
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>404</div>;

    return (
        <>
            <Header text="코스 상세"></Header>
            {renderMap()}
            <Title>{data?.title}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{data.hDong.name}</p>
                </div>
                <div>
                    <span>총 거리</span>
                    <p>{(data.pathLength / 3000).toFixed(2)}km</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{data.userId}</p>
                </div>
                <Button width="fit" onClick={handleToggleRecruitModal}>
                    이 코스로 모집하기
                </Button>
            </Content>
            <InputWrapper>
                <Modal toggled={showRecruitModal} toggleVisible={handleToggleRecruitModal}>
                    <Input placeholder={PLACEHOLDER.TITLE} type="text" onChange={onChangeTitle}></Input>
                    <span>{titleError}</span>
                    <MaxPplInput onChangePpl={onChangeMaxPpl}></MaxPplInput>
                    <StartTimeInput onChangeTime={onChangeStartTime}></StartTimeInput>
                    <PaceInput onChangeMinute={onChangeMinute} onChangeSecond={onChangeSecond}></PaceInput>
                    <Buttons>
                        <Button backgroundColor={COLOR.DARK_GRAY} onClick={handleToggleRecruitModal}>
                            취소
                        </Button>
                        <Button onClick={checkFormValidation}>등록</Button>
                    </Buttons>
                </Modal>
            </InputWrapper>
            <ConfirmModal
                text="등록 하시겠습니까?"
                showModal={showConfirmModal}
                handleToggleModal={handleToggleConfirmModal}
                confirmOnClick={onSubmitRecruit}
            ></ConfirmModal>
        </>
    );
};

export default CourseDetail;
