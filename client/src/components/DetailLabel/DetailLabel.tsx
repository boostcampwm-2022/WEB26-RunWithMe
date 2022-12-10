import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";

const TextWrapper = styled.div<{ fontSize?: string }>`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    width: 100%;
    p:nth-child(1) {
        color: ${COLOR.LIGHT_GRAY};
        font-weight: ${400};
        font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.6rem")};
    }
    p:nth-child(2) {
        color: ${COLOR.BLACK};
        font-weight: ${500};
        font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.6rem")};
    }
`;

interface DetailLabelProps {
    title: string;
    value: string;
    fontSize?: string;
}

const DetailLabel = ({ title, value, fontSize }: DetailLabelProps) => {
    return (
        <TextWrapper fontSize={fontSize}>
            <p>{title}</p>
            <p>{value}</p>
        </TextWrapper>
    );
};

export default DetailLabel;
