import { SkeletonP } from "#components/commons/Skeleton/Skeleton";
import styled from "styled-components";
import { skeleton } from "styles/skeleton";
import { CardWrapper, Summary } from "./Card.styles";

const SkeletonMap = styled.div`
    ${skeleton};
    width: 100%;
    aspect-ratio: 16/9;
`;

const CardLoader = () => {
    return (
        <CardWrapper>
            <SkeletonMap />
            <Summary>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5px" }}>
                    <SkeletonP height="1.9rem" width="100%" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SkeletonP height="1.5rem" width="60%" />
                    <SkeletonP height="1.5rem" width="20%" />
                </div>
            </Summary>
        </CardWrapper>
    );
};

export default CardLoader;
