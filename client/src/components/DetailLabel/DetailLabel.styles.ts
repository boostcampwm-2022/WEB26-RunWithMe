import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
export const TextWrapper = styled.div<{ fontSize?: string }>`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    width: 100%;
    color: ${COLOR.BLACK};
    p:nth-child(1) {
        font-weight: ${700};
        font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.6rem")};
    }
    p:nth-child(2) {
        font-weight: ${400};
        font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.6rem")};
    }
`;
