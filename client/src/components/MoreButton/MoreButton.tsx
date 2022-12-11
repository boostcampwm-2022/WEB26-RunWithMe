import styled from "styled-components";
import { MORE_BUTTON_ICON } from "#assets/icons";
import { useNavigate } from "react-router-dom";
import { flexRow } from "styles/flex";
import { fontMedium } from "styles/font";
import { COLOR } from "styles/color";
const MoreButtonWrapper = styled.div`
    ${flexRow};
    align-items: center;
    p {
        ${fontMedium(COLOR.BLACK, 400)}
    }
    img {
        margin-left: 4px;
        height: 14px;
    }
`;

interface MoreButtonProps {
    to: string;
}

const MoreButton = ({ to }: MoreButtonProps) => {
    const navigate = useNavigate();
    return (
        <MoreButtonWrapper
            onClick={() => {
                navigate(to);
            }}
        >
            <label>더 보기</label>
            <img width="14" height="14" alt="MORE_BUTTON_ICON" src={MORE_BUTTON_ICON} />
        </MoreButtonWrapper>
    );
};

export default MoreButton;
