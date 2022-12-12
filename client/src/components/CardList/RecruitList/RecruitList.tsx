import CardLoader from "#components/Card/Card.loader";
import RecruitCard from "#components/Card/RecruitCard/RecruitCard";
import useRecruitsQuery from "#hooks/queries/useRecruitsQuery";
import InfiniteScroll from "react-infinite-scroller";
import { CardWrapper } from "../CardList.styles";

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
        <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={
                <div style={{ padding: "2rem" }}>
                    <CardLoader />
                </div>
            }
        >
            <CardWrapper>
                {data?.pages.map((page, pageIdx) =>
                    page?.map((card, idx) => <RecruitCard data={card} key={`${pageIdx}_${idx}`} />),
                )}
            </CardWrapper>
        </InfiniteScroll>
    );
};

export default RecruitList;
