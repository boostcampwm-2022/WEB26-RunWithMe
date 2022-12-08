import { ALIGN_ITEMS, FlexOptions, JUSTIFY_CONTENT } from "#types/flexOptions";
import { css } from "styled-components";

export const flexRowSpaceBetween = css`
    display: flex;
    justify-content: space-between;
`;

export const flexRowSpaceAround = css`
    display: flex;
    justify-content: space-around;
`;

export const flexRowCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const flexColumnSpaceBetween = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const flexColumn = ({
    alignItems = ALIGN_ITEMS.FLEX_START,
    justifyContent = JUSTIFY_CONTENT.FLEX_START,
}: FlexOptions) => css`
    display: flex;
    flex-direction: column;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
`;

export const flexRow = ({
    alignItems = ALIGN_ITEMS.FLEX_START,
    justifyContent = JUSTIFY_CONTENT.FLEX_START,
}: FlexOptions) => css`
    display: flex;
    flex-direction: row;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
`;
