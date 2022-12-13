import MoreButton from "#components/MoreButton/MoreButton";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontXLarge } from "styles/font";

interface MoreTitleProps {
    text: string;
    to: string;
}

const TitleWrapper = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    padding: 0px 10px;
    > span {
        ${fontXLarge(COLOR.BLACK, 500)};
    }
`;

const MoreTitle = ({ text, to }: MoreTitleProps) => {
    return (
        <TitleWrapper>
            <span>{text}</span>
            <MoreButton to={to} />
        </TitleWrapper>
    );
};

export default MoreTitle;
