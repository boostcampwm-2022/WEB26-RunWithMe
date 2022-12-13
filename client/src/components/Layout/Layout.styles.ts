import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn, flexRowCenter } from "styles/flex";

export const Container = styled.div`
    background-image: linear-gradient(90deg, #a1c4fd 10%, #c2e9fb 90%);
    > div:first-child {
        ${flexColumn};
        justify-content: center;
        height: 100%;
        margin-right: 10rem;
        h1 {
            font-size: 4rem;
            margin-bottom: 2rem;
        }
        li {
            list-style: none;
            margin-bottom: 1rem;
        }
        @media screen and (min-width: 960px) {
            width: 500px;
            min-width: 500px;
            display: flex;
        }
        @media screen and (max-width: 960px) {
            display: none;
        }
    }
    > div:last-child {
        background-color: ${COLOR.WHITE};
        position: relative;
    }
    @media screen and (min-width: 480px) {
        ${flexRowCenter};
        width: 100vw;
        height: 100vh;
        > div:last-child {
            box-shadow: 2px 0 16px rgba(0, 0, 0, 0.25), -2px 0 16px rgba(0, 0, 0, 0.25);
            width: 390px;
            min-width: 390px;
            height: 100%;
            overflow-y: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
`;
