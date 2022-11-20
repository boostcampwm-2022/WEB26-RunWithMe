import { LOCK_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface LockButtonProps extends MapControlProps {
    onClick: () => void;
}
const LockButton = ({ onClick }: LockButtonProps) => {
    return (
        <MapButton onClick={onClick} position={{ top: "96px", right: "14px" }}>
            <img src={LOCK_ICON} />
        </MapButton>
    );
};
export default LockButton;
