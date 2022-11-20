import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { fontMidium, fontSmall } from "styles/font";

export const CardWrapper = styled.div`
    width: 100%;
    background: ${COLOR.WHITE};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    overflow: hidden;
    img {
        width: 100%;
        max-height: 200px;
    }
`;
export const Summary = styled.div`
    padding: 2px 8px;
`;

export const CardTitle = styled.p`
    ${fontMidium(COLOR.BLACK, 700)}
`;

export const SummaryBody = styled.div`
    ${flexRowSpaceBetween};
    div {
        ${flexRowSpaceBetween};
        margin-top: 4px;
        img {
            width: 10px;
            margin-right: 4px;
        }
        span {
            margin-right: 8px;
        }
    }
    span {
        ${fontSmall(COLOR.BLACK, 400)};
    }
`;

export const UserIdLabel = styled.span`
    color: ${COLOR.LIGHT_GRAY} !important;
`;
