import styled from "styled-components";
import { flexColumn } from "styles/flex";
import { COLOR } from "styles/color";

export const Title = styled.div`
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    font-size: 2rem;
    font-weight: bold;
    padding: 16px 10px 0px 10px;
`;

export const Content = styled.div`
    ${flexColumn};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 380px;
    padding: 15px 19px;
    div {
        margin-bottom: 10px;
        width: 100%;
        color: ${COLOR.DARK_GRAY};
        display: flex;
        justify-content: space-between;
        p {
            font-weight: 500;
            color: ${COLOR.BLACK};
        }
    }
`;
