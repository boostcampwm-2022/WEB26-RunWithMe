import { MapControlPosition } from "#types/MapControlProps";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowCenter } from "styles/flex";

export const MapButton = styled.div<{ position: MapControlPosition }>`
    ${flexRowCenter};
    padding: 10px;
    background: ${COLOR.WHITE};
    opacity: 0.9;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    position: absolute;
    top: ${({ position }) => position.top ?? "auto"};
    left: ${({ position }) => position.left ?? "auto"};
    bottom: ${({ position }) => position.bottom ?? "auto"};
    right: ${({ position }) => position.right ?? "auto"};
    z-index: 1;

    img {
        width: 14px;
    }
`;
