import { Recruit } from "#types/Recruit";
import { getDisplayPaceString } from "#utils/stringUtils";
import Card from "../Card";
import { CLOCK_ICON, LOCATION_ICON, RULER_ICON, RUNNING_ICON, USER_ICON } from "#assets/icons";
import { CardTitle, PeopleWrapper, SummaryBody, SummaryHead, UserIdLabel } from "../Card.styles";
import { timeDifference } from "#utils/cardUtils";

interface RecruitCardProps {
    data: Recruit;
}

const RecruitCard = ({ data }: RecruitCardProps) => {
    return (
        <Card to={`/recruit/${data.id}`} path={data.course.path}>
            <SummaryHead>
                <CardTitle>{data.title}</CardTitle>
                <PeopleWrapper>
                    <img alt="USER_ICON" src={USER_ICON} />
                    <span>{`${data.currentPpl}/${data.maxPpl}`}</span>
                </PeopleWrapper>
            </SummaryHead>
            <SummaryBody>
                <div>
                    <img alt="LOCATION_ICON" src={LOCATION_ICON} />
                    <span>{data.course.hDong.name}</span>
                    <img alt="RULER_ICON" src={RULER_ICON} />
                    <span>{`${(data.course.pathLength / 1000).toFixed(1)}km`}</span>
                    <img alt="RUNNING_ICON" src={RUNNING_ICON} />
                    <span>{getDisplayPaceString(data.pace)}</span>
                    <img alt="CLOCK_ICON" src={CLOCK_ICON} />
                    <span>{timeDifference(data.startTime)}</span>
                </div>
                <UserIdLabel>{data.userId}</UserIdLabel>
            </SummaryBody>
        </Card>
    );
};

export default RecruitCard;
