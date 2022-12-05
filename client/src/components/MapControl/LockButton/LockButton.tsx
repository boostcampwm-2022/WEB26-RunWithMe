import { LOCK_ICON, UNLOCK_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface LockButtonProps extends MapControlProps {
    isLocked: boolean;
    onClick: () => void;
}
const LockButton = ({ isLocked, onClick, position = { top: "96px", right: "14px" } }: LockButtonProps) => {
    return (
        <MapButton onClick={onClick} position={position}>
            <img src={isLocked ? LOCK_ICON : UNLOCK_ICON} />
        </MapButton>
    );
};
export default LockButton;
