import { UNDO_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface UndoButtonProps extends MapControlProps {
    onClick: () => void;
}
const UndoButton = ({ onClick, position }: UndoButtonProps) => {
    return (
        <MapButton onClick={onClick} position={position}>
            <img src={UNDO_ICON} />
        </MapButton>
    );
};
export default UndoButton;
