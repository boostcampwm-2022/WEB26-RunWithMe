import React, { ReactNode } from "react";
import { Button as Btn } from "./Button.styles";
import { COLOR } from "styles/color";

interface ButtonProps {
    color?: string;
    backgroundColor?: string;
    width?: "fill" | "contain";
    onClick: () => void;
    children: ReactNode;
}

const Button = ({
    color = COLOR.WHITE,
    backgroundColor = COLOR.PRIMARY,
    width = "contain",
    onClick,
    children,
}: ButtonProps) => {
    return (
        <Btn
            onClick={onClick}
            color={color}
            backgroundColor={backgroundColor}
            width={width === "fill" ? "100%" : "auto"}
        >
            {children}
        </Btn>
    );
};

export default Button;
