import styled from "styled-components";
import { COLOR } from "styles/color";
import { fontSmall } from "styles/font";
import { fontMedium } from "styles/font";

export const ModalFilterWrapper = styled.div`
    width: 50vw;
    div {
        border-radius: 5px;
        cursor: pointer;
        padding: 4px 4px 8px 8px;
        ${fontSmall(COLOR.BLACK, 500)}
        div&:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    & :last-child {
        margin-top: 10px;
        border-top: 1px solid gray;
    }
    button {
        padding-top: 1rem;
        width: 100%;
        border: none;
        background: transparent;
        ${fontSmall(COLOR.BLACK, 700)}
    }
    header {
        text-align: center;
        ${fontMedium(COLOR.BLACK, 700)}
        margin-bottom: 1.5rem;
    }
`;
