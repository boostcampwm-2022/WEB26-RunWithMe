import styled, { css } from "styled-components";
import { COLOR } from "styles/color";
import { flexColumnSpaceBetween, flexRowCenter, flexRowSpaceBetween } from "styles/flex";
import { fontLarge, fontSmall } from "styles/font";
import { MenuProps } from "./MyPageTypes";

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    margin-top: -5px;
    background: white;
    padding: 0 30px;
`;

export const Menu = styled.div<MenuProps>`
    ${flexRowCenter}
    margin: 0 16px -2px 16px;
    height: 30px;
    width: 30vw;
    text-align: center;
    ${fontLarge(COLOR.DARK_GRAY, 500)};

    ${(props) =>
        props.enabled &&
        css`
            font-weight: 700;
            color: ${COLOR.PRIMARY};
            border-bottom: 3px solid black;
        `};
`;
