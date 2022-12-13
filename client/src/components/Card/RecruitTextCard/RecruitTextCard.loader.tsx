import { SkeletonH2 } from "#components/commons/Skeleton/Skeleton";
import DetailLabelLoader from "#components/DetailLabel/DetailLabel.loader";
import { Card } from "./RecruitTextCard.styles";

const RecruitTextCardLoader = () => {
    return (
        <Card>
            <SkeletonH2 width="100%" height="1.9rem" />
            <DetailLabelLoader fontSize={"1.2rem"} title="출발점" />
            <DetailLabelLoader fontSize={"1.2rem"} title="총거리" />
            <DetailLabelLoader fontSize={"1.2rem"} title="페이스" />
            <DetailLabelLoader fontSize={"1.2rem"} title="참가 현황" />
            <DetailLabelLoader fontSize={"1.2rem"} title="집합 일시" />
        </Card>
    );
};
export default RecruitTextCardLoader;
