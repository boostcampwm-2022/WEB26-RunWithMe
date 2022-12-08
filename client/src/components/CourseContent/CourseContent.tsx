import DetailLabel from "#components/DetailLabel/DetailLabel";
import { Course } from "#types/Course";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
import styled from "styled-components";
import { flexColumn } from "styles/flex";

const Body = styled.div`
    ${flexColumn({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
    width: 100%;
    height: 130px;
    padding: 15px 20px;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 10px;
`;

interface CourseContentProps {
    data: Course;
}

const CourseContent = ({ data }: CourseContentProps) => {
    return (
        <>
            <Title>{data.title}</Title>
            <Body>
                <DetailLabel title="출발점" value={data.hDong.name} />
                <DetailLabel title="총거리" value={(data.pathLength / 1000).toFixed(2)} />
                <DetailLabel title="게시자" value={data.userId} />
            </Body>
        </>
    );
};

export default CourseContent;
