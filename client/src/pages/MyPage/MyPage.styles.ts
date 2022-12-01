import Header from "#components/Header/Header";
import styled, { css } from "styled-components";
import { COLOR } from "styles/color";
import { flexColumnSpaceBetween } from "styles/flex";
import { fontLarge } from "styles/font";

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    margin-top: -5px;
    background: white;
`;

export const Menu = styled.div`
    padding: 8px 16px;
    width: 30vw;
    text-align: center;
    ${fontLarge(COLOR.DARK_GRAY, 500)};
`;

export const MyInfoWrapper = styled.div`
    width: 100%;
    ${flexColumnSpaceBetween}
    align-items: center;
    button {
        width: 90%;
    }
`;

export const MyName = styled.div`
    padding: 30px 50px;
    ${fontLarge(COLOR.BLACK, 700)};
`;
export const MyInfo = styled.div``;
