import Card from "../Card";
import { LOCATION_ICON, RULER_ICON } from "#assets/icons";
import { CardTitle, SummaryBody, UserIdLabel } from "../Card.styles";
import { Course } from "#types/Course";

interface CourseCardProps {
    data: Course;
}

const CourseCard = ({ data }: CourseCardProps) => {
    return (
        <Card to={`/course/${data.id}`} path={data.path}>
            <CardTitle>{data.title}</CardTitle>
            <SummaryBody>
                <div>
                    <img width="14" height="14" alt="LOCATION_ICON" src={LOCATION_ICON} />
                    <span>{data.hDong.name}</span>
                    <img width="14" height="14" alt="RULER_ICON" src={RULER_ICON} />
                    <span>{`${(data.pathLength / 1000).toFixed(1)}km`}</span>
                </div>
                <UserIdLabel>{data.userId}</UserIdLabel>
            </SummaryBody>
        </Card>
    );
};

export default CourseCard;
