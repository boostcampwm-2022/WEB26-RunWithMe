import React, { ReactNode } from "react";
import { Button as Btn } from "./Button.styles";
import { COLOR } from "styles/color";

interface ButtonProps {
    color?: string;
    backgroundColor?: string;
    width?: "fill" | "fit";
    onClick?: () => void;
    children: ReactNode;
    type?: "button" | "submit";
}

const Button = ({
    color = COLOR.WHITE,
    backgroundColor = COLOR.PRIMARY,
    width = "fit",
    onClick,
    children,
    type = "button",
}: ButtonProps) => {
    return (
        <Btn
            onClick={onClick}
            color={color}
            backgroundColor={backgroundColor}
            width={width === "fill" ? "100%" : "fit-content"}
            type={type}
        >
            {children}
        </Btn>
    );
};

export default Button;
