import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow, flexRowCenter } from "styles/flex";
import { fontMedium } from "styles/font";

export const Logo = styled.div`
    color: ${COLOR.BLACK};
    width: 100%;
    margin: 50px 0;
    height: 29px;
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;
`;

export const InputWrapper = styled.div`
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
    ${flexRow};
    align-items: center;

    margin: 1rem 0 0 1rem;
    label {
        margin-left: 1rem;
        ${fontMedium(COLOR.BLACK, 500)}
    }
`;

export const OptionsWrapper = styled.div`
    margin-top: 40px;
    color: ${COLOR.DARK_GRAY};
    display: flex;
    justify-content: center;
    width: 100%;
    span {
        cursor: pointer;
        padding: 0 1rem;
    }

    span:not(:last-child) {
        border-right: 0.1rem solid grey;
    }
`;
