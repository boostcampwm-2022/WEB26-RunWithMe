import DetailLabel from "#components/DetailLabel/DetailLabel";
import { Recruit } from "#types/Recruit";
import { getDisplayPaceString, getTimeFormat } from "#utils/stringUtils";
import { useNavigate } from "react-router-dom";
import { Card } from "./RecruitTextCard.styles";

interface RecruitTextCardProps {
    data: Recruit;
}

const RecruitTextCard = ({ data }: RecruitTextCardProps) => {
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/recruit/${data.id}`)}>
            <h2>{data.title}</h2>
            <DetailLabel fontSize={"1.2rem"} title="출발점" value={data.course.hDong.name || ""} />
            <DetailLabel fontSize={"1.2rem"} title="총거리" value={`${(data.course.pathLength / 1000).toFixed(1)}km`} />
            <DetailLabel fontSize={"1.2rem"} title="페이스" value={getDisplayPaceString(data.pace)} />
            <DetailLabel fontSize={"1.2rem"} title="참가 현황" value={`${data.currentPpl}/${data.maxPpl}`} />
            <DetailLabel
                fontSize={"1.2rem"}
                title="집합 일시"
                value={getTimeFormat(
                    new Date(new Date(data.startTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
                )}
            />
        </Card>
    );
};
export default RecruitTextCard;
