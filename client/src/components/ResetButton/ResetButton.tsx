import { DELETE_ICON } from "#assets/icons";

interface ResetButtonProps {
    width?: string;
    onClick: () => void;
}

const ResetButton = ({ width, onClick }: ResetButtonProps) => {
    return <img style={{ width }} onClick={onClick} src={DELETE_ICON}></img>;
};
export default ResetButton;
