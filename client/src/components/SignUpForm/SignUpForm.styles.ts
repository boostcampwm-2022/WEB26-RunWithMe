import { ALIGN_ITEMS } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontMedium } from "styles/font";

export const SignUpContainer = styled.div`
    width: 100%;
    padding: 0 40px;
    div {
        input {
            font-size: 1.4rem;
        }
    }

    span {
        color: red;
        font-size: 1rem;
    }

    button {
        margin-top: 25px;
    }
`;
export const CheckboxWrapper = styled.div`
    ${flexRow({ alignItems: ALIGN_ITEMS.CENTER })};

    margin: 1rem 0 0 1rem;
    label {
        margin-left: 1rem;
        ${fontMedium(COLOR.BLACK, 500)}
    }
`;
