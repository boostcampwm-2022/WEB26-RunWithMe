import styled from "styled-components";
import { COLOR } from "styles/color";

export const LogoWrapper = styled.div`
    color: ${COLOR.BLACK};
    width: 90%;
    height: 29px;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: "Noto Sans KR";
    margin: auto;
    padding: 5rem;
    text-align: center;
`;

export const InputWrapper = styled.div`
    padding: 4rem;
    width: 90%;
    margin: auto;
    div {
        display: block;
        margin: auto;

        input {
            font-size: 1.4rem;
        }
    }

    span {
        color: red;
        float: left;
        font-size: 1rem;
    }

    button {
        margin-top: 2.5rem;
    }
`;

export const OptionsWrapper = styled.div`
    color: grey;
    display: flex;
    margin: auto;
    width: 90%;
    padding: 0 10rem;

    div {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        padding: 0.1rem 0.9rem;
        cursor: pointer;
    }

    div:not(:last-child) {
        border-right: 0.1rem solid grey;
    }
`;
