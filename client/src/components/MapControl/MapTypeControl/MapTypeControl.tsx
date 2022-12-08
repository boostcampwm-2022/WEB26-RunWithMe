import { MapControlPosition, MapControlProps } from "#types/MapControlProps";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontSmall } from "styles/font";
const Wrapper = styled.div<{ position: MapControlPosition }>`
    ${flexRow({})};
    z-index: 1;
    background-color: ${COLOR.WHITE};
    opacity: 0.9;
    position: absolute;
    top: ${({ position }) => position.top ?? "auto"};
    left: ${({ position }) => position.left ?? "auto"};
    bottom: ${({ position }) => position.bottom ?? "auto"};
    right: ${({ position }) => position.right ?? "auto"};
    padding: 2px;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
    border-radius: 4px;
`;

const ViewButton = styled.div<{ isSelected: boolean }>`
    ${({ isSelected }) => fontSmall(isSelected ? COLOR.WHITE : COLOR.BLACK, isSelected ? 700 : 500)}
    background-color: ${({ isSelected }) => (isSelected ? COLOR.PRIMARY : COLOR.WHITE)};
    padding: 8px;
    border-radius: 4px;
`;

interface MapTypeControlProps extends MapControlProps {
    onClickRoadMap: () => void;
    onClickSkyView: () => void;
    mapType: kakao.maps.MapTypeId;
}

const MapTypeControl = ({
    position = { bottom: "14px", right: "62px" },
    onClickRoadMap,
    onClickSkyView,
    mapType,
}: MapTypeControlProps) => {
    return (
        <Wrapper position={position}>
            <ViewButton onClick={onClickRoadMap} isSelected={mapType === kakao.maps.MapTypeId.ROADMAP}>
                지도
            </ViewButton>
            <ViewButton onClick={onClickSkyView} isSelected={mapType === kakao.maps.MapTypeId.HYBRID}>
                스카이뷰
            </ViewButton>
        </Wrapper>
    );
};

export default MapTypeControl;
