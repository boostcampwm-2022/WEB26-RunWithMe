import useCardMap from "#hooks/useCardMap";
import { LatLng } from "#types/LatLng";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CardWrapper, Summary } from "./Card.styles";

interface CardProps {
    to: string;
    children: ReactNode;
    path: LatLng[];
}

const Card = ({ to, children, path }: CardProps) => {
    const navigate = useNavigate();
    const { renderMap } = useCardMap({ runningPath: path });
    return (
        <CardWrapper onClick={() => navigate(to)}>
            {renderMap()}
            <Summary>{children}</Summary>
        </CardWrapper>
    );
};

export default Card;
