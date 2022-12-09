import RecruitCard from "#components/Card/RecruitCard/RecruitCard";
import useRecruitsQuery from "#hooks/queries/useRecruitsQuery";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
const CardWrapper = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export interface RecruitListProps {
    distance?: { min: number; max: number };
    time?: { min: number; max: number };
    query?: string;
    authorFilter?: boolean;
    titleFilter?: boolean;
    availFilter?: boolean;
}

const RecruitList = (props: RecruitListProps) => {
    const { data, fetchNextPage, hasNextPage } = useRecruitsQuery({ ...props });

    return (
        <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage} loader={<h4>Loading...</h4>}>
            <CardWrapper>
                {data?.pages.map((page, pageIdx) =>
                    page.map((card, idx) => <RecruitCard data={card} key={`${pageIdx}_${idx}`} />),
                )}
            </CardWrapper>
        </InfiniteScroll>
    );
};

export default RecruitList;
