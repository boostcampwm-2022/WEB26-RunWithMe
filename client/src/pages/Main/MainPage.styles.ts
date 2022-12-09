import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontXLarge } from "styles/font";

export const MainPageContainer = styled.div`
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    > div:first-child {
        margin-bottom: 16px;
    }
    > div:last-child {
        margin-top: 48px;
    }
`;
