import React from "react";
import { Button as Btn } from "./styles";
import { COLOR } from "styles/color";

interface ButtonProps {
    color?: string;
    backgroundColor?: string;
    text: string;
    width?: "fill" | "contain";
    onClick: () => void;
}

const Button = ({
    color = COLOR.WHITE,
    backgroundColor = COLOR.PRIMARY,
    width = "contain",
    text = COLOR.WHITE,
    onClick,
}: ButtonProps) => {
    return (
        <Btn
            onClick={onClick}
            color={color}
            backgroundColor={backgroundColor}
            width={width === "fill" ? "100%" : "auto"}
        >
            {text}
        </Btn>
    );
};

export default Button;
