import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn, flexRow } from "styles/flex";

export const Title = styled.div`
    ${flexRow({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    font-size: 2rem;
    font-weight: bold;
    padding: 10px 20px;
`;

export const Content = styled.div`
    ${flexColumn({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 300px;
    padding: 15px 19px;
    div {
        ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
        margin-bottom: 10px;
        width: 100%;
        color: ${COLOR.DARK_GRAY};

        p {
            font-weight: 500;
            color: ${COLOR.BLACK};
        }
    }
`;

export const ButtonWrapper = styled.div`
    justify-content: center !important;
    gap: 8px;
`;
