import DetailLabel from "#components/DetailLabel/DetailLabel";
import { Recruit } from "#types/Recruit";
import { getDisplayPaceString } from "#utils/stringtils";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
    padding: 12px 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    div:not(:last-child) {
        margin-bottom: 30px;
    }
`;

interface RecruitTextCardProps {
    data: Recruit;
}

const RecruitTextCard = ({ data }: RecruitTextCardProps) => {
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/recruit/${data.id}`)}>
            <DetailLabel title="출발점" value={data.course.hDong.name || ""} />
            <DetailLabel title="총거리" value={`${(data.course.pathLength / 1000).toFixed(1)}km`} />
            <DetailLabel title="페이스" value={getDisplayPaceString(data.pace)} />
            <DetailLabel title="참가 현황" value={`${data.currentPpl}/${data.maxPpl}`} />
            <DetailLabel title="집합 일시" value={data.startTime.toLocaleString()} />
        </Card>
    );
};
export default RecruitTextCard;