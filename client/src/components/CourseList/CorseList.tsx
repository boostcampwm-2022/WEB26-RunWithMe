import CourseCard from "#components/Card/CourseCard/CourseCard";
import useCourseListQuery from "#hooks/queries/useCourseListQuery";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
const CardWrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export interface CourseListProps {
    distance?: { min: number; max: number };
    query?: string;
    authorFilter?: boolean;
    titleFilter?: boolean;
}

const CorseList = ({ distance, query, authorFilter, titleFilter }: CourseListProps) => {
    const { data, fetchNextPage, hasNextPage } = useCourseListQuery({ distance, query, authorFilter, titleFilter });

    return (
        <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage} loader={<h4>Loading...</h4>}>
            <CardWrapper>
                {data?.pages.map((page, pageIdx) =>
                    page.map((card, idx) => <CourseCard data={card} key={`${pageIdx}_${idx}`} />),
                )}
            </CardWrapper>
        </InfiniteScroll>
    );
};

export default CorseList;
