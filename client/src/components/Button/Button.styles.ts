import styled from "styled-components";
import { fontLarge } from "styles/font";

interface ButtonProps {
    width: string;
    color: string;
    backgroundColor: string;
}

export const Button = styled.button<ButtonProps>`
    font-family: "Noto Sans KR";
    padding: 8px 16px;
    border-radius: 5px;
    border: none;
    width: ${({ width }) => width};
    ${({ color }) => fontLarge(color, 500)}
    background-color: ${({ backgroundColor }) => backgroundColor};
    position: relative;
`;
