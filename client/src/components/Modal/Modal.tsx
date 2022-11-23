import React, { ReactNode } from "react";
import { ContentWrapper, Dimmed } from "./Modal.styles";

interface ModalProps {
    children: ReactNode;
    toggled: boolean;
    toggleVisible: () => void;
}

const Modal = ({ children, toggleVisible, toggled }: ModalProps) => {
    return (
        <>
            {toggled && (
                <Dimmed onClick={toggleVisible}>
                    <ContentWrapper onClick={(e) => e.stopPropagation()}>{children}</ContentWrapper>
                </Dimmed>
            )}
        </>
    );
};

export default Modal;
