import React, { ReactNode } from "react";
import { ContentWrapper, Dimmed } from "./Modal.styles";

interface ModalProps {
    children: ReactNode;
    toggleVisible: () => void;
}

const Modal = ({ children, toggleVisible }: ModalProps) => {
    return (
        <Dimmed onClick={toggleVisible}>
            <ContentWrapper onClick={(e) => e.stopPropagation()}>{children}</ContentWrapper>
        </Dimmed>
    );
};

export default Modal;
