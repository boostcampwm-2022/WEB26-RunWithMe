import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { fontLarge } from "styles/font";

const TextWrapper = styled.div`
    ${flexRowSpaceBetween};
    width: 100%;
    p:nth-child(1) {
        ${fontLarge(COLOR.LIGHT_GRAY, 400)};
    }
    p:nth-child(2) {
        ${fontLarge(COLOR.BLACK, 500)};
    }
`;

interface DetailLabelProps {
    title: string;
    value: string;
}

const DetailLabel = ({ title, value }: DetailLabelProps) => {
    return (
        <TextWrapper>
            <p>{title}</p>
            <p>{value}</p>
        </TextWrapper>
    );
};

export default DetailLabel;
