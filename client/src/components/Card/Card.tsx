import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "styles/color";

const CardWrapper = styled.div`
    width: 100%;
    background: ${COLOR.WHITE};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    overflow: hidden;
    img {
        width: 100%;
        max-height: 200px;
    }
`;
const Summary = styled.div`
    padding: 2px 8px;
`;

interface CardProps {
    img: string;
    to: string;
    children: ReactNode;
}

const Card = ({ img, to, children }: CardProps) => {
    const navigate = useNavigate();
    return (
        <CardWrapper onClick={() => navigate(to)}>
            <img src={img} />
            <Summary>{children}</Summary>
        </CardWrapper>
    );
};

export default Card;
