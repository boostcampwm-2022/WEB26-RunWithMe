import Button from "#components/Button/Button";
import { RecruitDetail } from "#types/RecruitDetail";
import { getPaceFormat } from "#utils/paceUtils";
import { getTimeFormat } from "#utils/stringUtils";
import { useCallback } from "react";
import { Content, Title } from "./RecruitContent.styles";

interface RecruitContentProps {
    data: RecruitDetail;
    onClick: () => void;
}

const RecruitContent = ({ onClick, data }: RecruitContentProps) => {
    const getButtonText = useCallback((recruit: RecruitDetail) => {
        const { isParticipating, isAuthor } = recruit;
        if (isAuthor) return "모집 취소";
        if (isParticipating) return "참여 취소";
        return "참여하기";
    }, []);
    return (
        <>
            <Title>{data.title}</Title>
            <Content>
                <div>
                    <span>출발점</span>
                    <p>{data.hDong.name}</p>
                </div>
                <div>
                    <span>총거리</span>
                    <p>{data.pathLength}km</p>
                </div>
                <div>
                    <span>페이스</span>
                    <p>{getPaceFormat(data.pace)}/km</p>
                </div>
                <div>
                    <span>집합 일시</span>
                    <p>{getTimeFormat(data.startTime)}</p>
                </div>
                <div>
                    <span>게시자</span>
                    <p>{data.userId}</p>
                </div>
                <div>
                    <span>참가 현황</span>
                    <p>
                        {data.currentPpl} / {data.maxPpl}
                    </p>
                </div>
                <Button onClick={onClick}>{getButtonText(data)}</Button>
            </Content>
        </>
    );
};

export default RecruitContent;
