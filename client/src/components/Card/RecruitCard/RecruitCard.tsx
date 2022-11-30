import { Recruit } from "#types/Recruit";
import { getDisplayPaceString } from "#utils/stringUtils";
import Card from "../Card";
import { LOCATION_ICON, RULER_ICON, RUNNING_ICON, USER_ICON } from "#assets/icons";
import { CardTitle, PeopleWrapper, SummaryBody, SummaryHead, UserIdLabel } from "../Card.styles";

interface RecruitCardProps {
    data: Recruit;
}

const RecruitCard = ({ data }: RecruitCardProps) => {
    return (
        <Card
            img={
                "https://kr.object.ncloudstorage.com/j199/img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202022-11-20%20%EC%98%A4%ED%9B%84%204.01.56.png"
            }
            to={`/recruit/${data.id}`}
        >
            <SummaryHead>
                <CardTitle>{data.title}</CardTitle>
                <PeopleWrapper>
                    <img src={USER_ICON} />
                    <span>{`${data.currentPpl}/${data.maxPpl}`}</span>
                </PeopleWrapper>
            </SummaryHead>
            <SummaryBody>
                <div>
                    <img src={LOCATION_ICON} />
                    <span>{data.course.hDong.name}</span>
                    <img src={RULER_ICON} />
                    <span>{`${(data.course.pathLength / 1000).toFixed(1)}km`}</span>
                    <img src={RUNNING_ICON} />
                    <span>{getDisplayPaceString(data.pace)}</span>
                </div>
                <UserIdLabel>{data.userId}</UserIdLabel>
            </SummaryBody>
        </Card>
    );
};

export default RecruitCard;
