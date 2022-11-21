import styled from "styled-components";
import { COLOR } from "styles/color";

export const LogoWrapper = styled.div`
    color: ${COLOR.BLACK};
    width: 100%;
    margin: 50px 0;
    height: 29px;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: "Noto Sans KR";
    text-align: center;
`;

export const InputWrapper = styled.div`
    width: 100%;
    padding: 0 40px;
    margin-bottom: 40px;
    div {
        display: block;
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
        margin-top: 25px;
    }
`;

export const OptionsWrapper = styled.div`
    color: ${COLOR.DARK_GRAY};
    display: flex;
    justify-content: center;
    width: 100%;
    div {
        cursor: pointer;
        padding: 0 1rem;
    }

    div:not(:last-child) {
        border-right: 0.1rem solid grey;
    }
`;
