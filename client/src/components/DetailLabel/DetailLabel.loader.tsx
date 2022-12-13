import { SkeletonP } from "#components/commons/Skeleton/Skeleton";
import { TextWrapper } from "./DetailLabel.styles";
interface DetailLabelLoaderProps {
    fontSize: string;
    title: string;
}

const DetailLabelLoader = ({ fontSize, title }: DetailLabelLoaderProps) => {
    return (
        <TextWrapper fontSize={fontSize}>
            <p>{title}</p>
            <SkeletonP height={fontSize} width={"50%"}></SkeletonP>
        </TextWrapper>
    );
};

export default DetailLabelLoader;
