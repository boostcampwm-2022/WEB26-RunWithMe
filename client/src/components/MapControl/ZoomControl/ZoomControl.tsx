import styled from "styled-components";
import { flexColumn, flexRowCenter } from "styles/flex";
import { ZOOM_IN_ICON, ZOOM_OUT_ICON } from "#assets/icons";
import { COLOR } from "styles/color";
const Wrapper = styled.div`
    ${flexColumn};
    z-index: 1;
    background-color: ${COLOR.WHITE};
    width: 34px;
    height: 68px;
    opacity: 0.9;
    position: absolute;
    top: 14px;
    right: 14px;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
    border-radius: 4px;
    div:nth-child(1) {
        border-bottom: ${`1px solid ${COLOR.BABY_BLUE}`};
    }
    div {
        ${flexRowCenter};
        width: 100%;
        height: 100%;
        img {
            width: 14px;
        }
    }
`;

interface ZoomControlProps {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
}

const ZoomControl = ({ onClickZoomIn, onClickZoomOut }: ZoomControlProps) => {
    return (
        <Wrapper>
            <div onClick={onClickZoomIn}>
                <img alt="ZOOM_IN_ICON" src={ZOOM_IN_ICON} />
            </div>
            <div onClick={onClickZoomOut}>
                <img alt="ZOOM_OUT_ICON" src={ZOOM_OUT_ICON} />
            </div>
        </Wrapper>
    );
};

export default ZoomControl;
