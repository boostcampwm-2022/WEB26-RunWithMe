import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { fontMidium, fontSmall } from "styles/font";
export const RecruitTitle = styled.p`
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
