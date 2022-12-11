import Button from "#components/Button/Button";
import { ConfirmModalProps } from "#components/ConfirmModal/ConfirmModal";
import Input from "#components/Input/Input";
import MaxPplInput from "#components/Input/MaxPplInput/MaxPplInput";
import PaceInput from "#components/Input/PaceInput/PaceInput";
import StartTimeInput from "#components/Input/StartTimeInput/StartTimeInput";
import Modal from "#components/Modal/Modal";
import { PLACEHOLDER } from "#constants/placeholder";
import useInput from "#hooks/useInput";
import useMaxPplInput from "#hooks/useMaxPplInput";
import usePaceInput from "#hooks/usePaceInput";
import usePostRecruitMutation from "#hooks/queries/usePostRecruitMutation";
import useStartTimeInput from "#hooks/useStartTimeInput";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import { recruitTitleValidator } from "#utils/validationUtils";
import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

const Buttons = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_AROUND })}
    padding-top: 16px;
`;

interface CreateRecruitModalProps {
    courseId: number;
    toggleVisible: () => void;
    children: FC<ConfirmModalProps>;
}

const CreateRecruitModal = ({ courseId, toggleVisible, children }: CreateRecruitModalProps) => {
    const [title, onChangeTitle, titleError] = useInput(recruitTitleValidator);
    const { pace, onChangeMinute, onChangeSecond } = usePaceInput();
    const { startTime, onChangeStartTime } = useStartTimeInput();
    const { maxPpl, onChangeMaxPpl } = useMaxPplInput();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { mutate } = usePostRecruitMutation();

    const checkFormValidation = () => {
        return title && startTime && pace;
    };

    const onClickRecruitButton = () => {
        if (!checkFormValidation()) return;
        handleToggleConfirmModal();
    };

    const handleToggleConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal);
    };

    const onSubmitRecruit = async () => {
        mutate({ title: title as string, courseId, startTime, maxPpl, pace: pace.minute * 60 + pace.second });
    };

    return (
        <Modal toggleVisible={toggleVisible}>
            <Input placeholder={PLACEHOLDER.TITLE} type="text" onChange={onChangeTitle}></Input>
            <span>{titleError}</span>
            <MaxPplInput onChangePpl={onChangeMaxPpl}></MaxPplInput>
            <StartTimeInput onChangeTime={onChangeStartTime}></StartTimeInput>
            <PaceInput onChangeMinute={onChangeMinute} onChangeSecond={onChangeSecond}></PaceInput>
            <Buttons>
                <Button backgroundColor={COLOR.DARK_GRAY} onClick={toggleVisible}>
                    취소
                </Button>
                <Button onClick={onClickRecruitButton}>등록</Button>
            </Buttons>
            {showConfirmModal &&
                children({
                    text: "등록 하시겠습니까?",
                    handleToggleModal: handleToggleConfirmModal,
                    confirmOnClick: onSubmitRecruit,
                })}
        </Modal>
    );
};

export default CreateRecruitModal;
