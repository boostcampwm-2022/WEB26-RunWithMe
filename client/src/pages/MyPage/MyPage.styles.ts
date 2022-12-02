import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumnSpaceBetween, flexRowSpaceBetween } from "styles/flex";
import { fontLarge, fontSmall } from "styles/font";

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
    gap: 30px;
`;

export const MyName = styled.div`
    padding: 30px 50px;
    ${fontLarge(COLOR.BLACK, 700)};
`;

export const MyInfo = styled.div`
    width: 90%;
    ${flexRowSpaceBetween}
    & span:last-child {
        ${fontSmall(COLOR.BLACK, 700)};
    }
    & span:first-child {
        ${fontSmall(COLOR.LIGHT_GRAY, 500)};
    }
`;
