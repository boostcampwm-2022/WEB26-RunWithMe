import Button from "#components/Button/Button";
import Modal from "#components/Modal/Modal";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceAround } from "styles/flex";

interface ConfirmModalProps {
    text: string;
    showModal: boolean;
    handleToggleModal: () => void;
    confirmOnClick: () => void;
}

const Buttons = styled.div`
    ${flexRowSpaceAround}
    padding-top: 16px;
    gap: 3rem;
`;

const ConfirmModal = ({ text, confirmOnClick, showModal, handleToggleModal }: ConfirmModalProps) => {
    return (
        <Modal toggled={showModal} toggleVisible={handleToggleModal}>
            <div>{text}</div>
            <Buttons>
                <Button backgroundColor={COLOR.DARK_GRAY} onClick={handleToggleModal}>
                    취소
                </Button>
                <Button onClick={confirmOnClick}>확인</Button>
            </Buttons>
        </Modal>
    );
};

export default ConfirmModal;
