import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowCenter } from "styles/flex";

export const Dimmed = styled.div`
    ${flexRowCenter};
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    * {
        max-width: 100% !important;
        max-height: 100% !important;
    }
`;

export const ContentWrapper = styled.div`
    padding: 16px;
    background: ${COLOR.WHITE};
    border-radius: 20px;
`;
