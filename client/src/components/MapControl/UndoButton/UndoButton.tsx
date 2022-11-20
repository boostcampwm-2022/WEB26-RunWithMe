import { UNDO_ICON } from "#assets/icons";
import { MapControlProps } from "#types/MapControlProps";
import { MapButton } from "../MapControl.styles";
interface UndoButtonProps extends MapControlProps {
    onClick: () => void;
}
const UndoButton = ({ onClick }: UndoButtonProps) => {
    return (
        <MapButton onClick={onClick} position={{ bottom: "14px", right: "14px" }}>
            <img src={UNDO_ICON} />
        </MapButton>
    );
};
export default UndoButton;
