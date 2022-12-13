import { ALIGN_ITEMS } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn } from "styles/flex";

export const InputWrapper = styled.div`
    ${flexColumn({ alignItems: ALIGN_ITEMS.CENTER })};
    width: 100%;
    height: "240px";
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    padding: 15px 27px;
    > div {
        margin-bottom: 10px;
        width: 100%;
        p {
            padding: 16px;
            border-bottom: 1px solid ${COLOR.BABY_BLUE};
        }
    }
`;
