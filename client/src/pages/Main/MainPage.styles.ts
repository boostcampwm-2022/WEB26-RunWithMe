import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { fontXLarge } from "styles/font";

export const MainPageContainer = styled.div`
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    > div:first-child {
        margin-bottom: 16px;
    }
    > div:last-child {
        margin-top: 48px;
    }
`;

export const CarouselWrapper = styled.div`
    .slick-slide {
        padding: 5px;
    }
    .slick-dots {
        margin-top: 30px;
        .slick-active {
            button {
                ::before {
                    color: ${COLOR.ORANGE} !important;
                }
            }
        }
        li {
            margin: 0 1px;
        }
    }
`;

export const TitleWrapper = styled.div`
    ${flexRowSpaceBetween};
    padding: 0px 10px;
`;

export const ListTitle = styled.span`
    ${fontXLarge(COLOR.BLACK, 500)};
`;
