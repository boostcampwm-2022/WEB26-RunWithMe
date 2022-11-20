import { Recruit } from "#types/Recruit";
import { getDisplayPaceString } from "#utils/stringtils";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRowSpaceBetween } from "styles/flex";
import { fontMidium, fontSmall } from "styles/font";
import Card from "../Card";
import { LOCATION_ICON, RULER_ICON, RUNNING_ICON } from "#assets/icons";
import { RecruitTitle, SummaryBody, UserIdLabel } from "./RecruitCard.styles";

interface RecruitCardProps {
    data: Recruit;
}

const RecruitCard = ({ data }: RecruitCardProps) => {
    return (
        <Card img={data.course.img} to={`/recruid/${data.recruitId}`}>
            <RecruitTitle>{data.title}</RecruitTitle>
            <SummaryBody>
                <div>
                    <img src={LOCATION_ICON} />
                    <span>{data.course.zipCode}</span>
                    <img src={RULER_ICON} />
                    <span>{`${(data.course.pathLength / 1000).toFixed(1)}km`}</span>
                    <img src={RUNNING_ICON} />
                    <span>{getDisplayPaceString(data.pace)}</span>
                </div>
                <UserIdLabel>{data.authorId}</UserIdLabel>
            </SummaryBody>
        </Card>
    );
};

export default RecruitCard;
