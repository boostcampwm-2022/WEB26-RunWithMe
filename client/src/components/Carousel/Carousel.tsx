import { ReactNode } from "react";
import Slider, { Settings } from "react-slick";
import styled from "styled-components";
import { COLOR } from "styles/color";

interface CarouselProps {
    children: ReactNode;
}

export const Container = styled.div`
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

const settings: Settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
};

const Carousel = ({ children }: CarouselProps) => {
    return (
        <Container>
            <Slider {...settings}>{children}</Slider>
        </Container>
    );
};

export default Carousel;
