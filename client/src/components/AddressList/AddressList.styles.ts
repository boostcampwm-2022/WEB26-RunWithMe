import styled, { css } from "styled-components";
import { COLOR } from "styles/color";
import { fontMedium } from "styles/font";

const SearchBarItemStyle = css`
    background: ${COLOR.WHITE};
    /* opacity: 0.9; */
    border-radius: 10px;
    padding: 4px 8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const PlaceList = styled.ul`
    position: absolute;
    margin-top: 10px;
    ${SearchBarItemStyle};
    background-color: ${COLOR.WHITE};
    width: 100%;
    align-items: center;
    li {
        ${fontMedium(COLOR.DARK_GRAY, 500)};
        margin: 2px 0;
        list-style-type: none;
    }
`;

// const params = {};
// if (filter1) params.filter1 = true;
// if (filter2) params.filter2 = true;
// if (filter3) params.filter3 = true;
// get("/recruit", params);
