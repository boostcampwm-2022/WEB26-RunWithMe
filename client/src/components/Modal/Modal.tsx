import React, { ReactNode } from "react";
import { ContentWrapper, Dimmed } from "./Modal.styles";

interface ModalProps {
    content: ReactNode;
    toggleVisible: () => void;
}

const Modal = ({ content, toggleVisible }: ModalProps) => {
    return (
        <Dimmed onClick={toggleVisible}>
            <ContentWrapper onClick={(e) => e.stopPropagation()}>{content}</ContentWrapper>
        </Dimmed>
    );
};

export default Modal;
