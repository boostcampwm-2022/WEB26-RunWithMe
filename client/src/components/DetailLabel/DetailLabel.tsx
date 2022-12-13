import { TextWrapper } from "./DetailLabel.styles";

interface DetailLabelProps {
    title: string;
    value: string;
    fontSize?: string;
}

const DetailLabel = ({ title, value, fontSize }: DetailLabelProps) => {
    return (
        <TextWrapper fontSize={fontSize}>
            <p>{title}</p>
            <p>{value}</p>
        </TextWrapper>
    );
};

export default DetailLabel;
