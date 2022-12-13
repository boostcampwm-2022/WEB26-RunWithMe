import CardMap from "#components/Map/CardMap/CardMap";
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
    return (
        <CardWrapper onClick={() => navigate(to)}>
            <CardMap path={path} />
            <Summary>{children}</Summary>
        </CardWrapper>
    );
};

export default Card;
