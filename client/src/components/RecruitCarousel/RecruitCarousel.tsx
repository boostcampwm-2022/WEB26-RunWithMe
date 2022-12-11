import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCard";
import Carousel from "#components/Carousel/Carousel";
import useRecruitsQuery from "#hooks/queries/useRecruitsQuery";
import { Recruit } from "#types/Recruit";

const RecruitCarousel = () => {
    const { data } = useRecruitsQuery({});
    return (
        <Carousel>
            {data?.pages[0]?.map((c: Recruit, idx: number) => (
                <RecruitTextCard data={c} key={idx} />
            ))}
        </Carousel>
    );
};

export default RecruitCarousel;
