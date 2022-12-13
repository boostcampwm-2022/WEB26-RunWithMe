import { STRAIGHT_ICON, CURVE_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface DrawButtonProps extends MapControlProps {
    isLocked: boolean;
    onClick: () => void;
}
const DrawButton = ({ isLocked, onClick, position = { top: "96px", right: "14px" } }: DrawButtonProps) => {
    return (
        <MapButton onClick={onClick} position={position}>
            <img width="14" height="14" alt="LOCK_ICON" src={isLocked ? CURVE_ICON : STRAIGHT_ICON} />
        </MapButton>
    );
};
export default DrawButton;
