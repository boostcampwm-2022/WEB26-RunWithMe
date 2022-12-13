import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowCenter } from "styles/flex";

export const Dimmed = styled.div`
    ${flexRowCenter};
    z-index: 2;
    width: 100vw;
    height: 100vh;
    position: fixed;
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
