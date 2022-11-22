import { SEARCH_ICON } from "#assets/icons";
import { MapControlPotition, MapControlProps } from "#types/MapControlProps";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowCenter, flexRowSpaceBetween } from "styles/flex";
import { fontMidium } from "styles/font";

const SearchContainer = styled.div<{ position: MapControlPotition }>`
    ${flexRowCenter};
    width: 100%;
    z-index: 1;
    position: absolute;
    top: ${({ position }) => position.top ?? "auto"};
    left: ${({ position }) => position.left ?? "auto"};
    bottom: ${({ position }) => position.bottom ?? "auto"};
    right: ${({ position }) => position.right ?? "auto"};
    div {
        ${flexRowSpaceBetween}
        background: ${COLOR.WHITE};
        opacity: 0.9;
        border-radius: 10px;
        padding: 4px 8px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    input {
        ${fontMidium(COLOR.DARK_GRAY, 500)}
        border: none;
        :focus {
            outline: none;
        }
    }
`;

const PlaceSearch = ({ position }: MapControlProps) => {
    return (
        <SearchContainer position={position}>
            <div>
                <input placeholder="장소, 주소, 버스 검색" />
                <img src={SEARCH_ICON} />
            </div>
        </SearchContainer>
    );
};
export default PlaceSearch;
