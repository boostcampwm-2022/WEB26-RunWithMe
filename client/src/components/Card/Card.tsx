import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CardWrapper, Summary } from "./Card.styles";

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
