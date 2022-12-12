import RecruitTextCardLoader from "#components/Card/RecruitTextCard/RecruitTextCard.loader";
import Carousel from "#components/Carousel/Carousel";

const RecruitCarouselLoader = () => {
    return (
        <Carousel>
            {new Array(10).fill(0).map((_, idx) => (
                <RecruitTextCardLoader key={idx} />
            ))}
        </Carousel>
    );
};

export default RecruitCarouselLoader;
