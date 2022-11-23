import { MapControlPotition } from "#types/MapControlProps";
import styled, { css } from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn, flexRowCenter, flexRowSpaceBetween } from "styles/flex";
import { fontMidium } from "styles/font";

const SearchBarItemStyle = css`
    background: ${COLOR.WHITE};
    opacity: 0.9;
    border-radius: 10px;
    padding: 4px 8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const SearchContainer = styled.div<{ position: MapControlPotition }>`
    ${flexColumn}
    align-items: center;
    position: absolute;
    width: 100%;
    z-index: 1;
    top: ${({ position }) => position.top ?? "auto"};
    left: ${({ position }) => position.left ?? "auto"};
    bottom: ${({ position }) => position.bottom ?? "auto"};
    right: ${({ position }) => position.right ?? "auto"};
`;

export const SearchWrapper = styled.div`
    ${flexRowCenter};
    width: 100%;
    div {
        ${flexRowSpaceBetween};
        ${SearchBarItemStyle};
    }
    input {
        ${fontMidium(COLOR.DARK_GRAY, 500)}
        border: none;
        :focus {
            outline: none;
        }
    }
    margin-bottom: 4px;
`;

export const PlaceList = styled.ul`
    ${SearchBarItemStyle};
    background-color: ${COLOR.WHITE};
    width: 200px;
    align-items: center;
    li {
        ${fontMidium(COLOR.DARK_GRAY, 500)};
        margin: 2px 0;
        list-style-type: none;
    }
`;
