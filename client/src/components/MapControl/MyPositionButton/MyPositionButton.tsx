import { MY_POSITION_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface UndoButtonProps extends MapControlProps {
    onClick: () => void;
}
const MyPositionButton = ({ onClick, position = { top: "14px", left: "14px" } }: UndoButtonProps) => {
    return (
        <MapButton onClick={onClick} position={position}>
            <img alt="MY_POSITION_ICON" src={MY_POSITION_ICON} />
        </MapButton>
    );
};
export default MyPositionButton;
