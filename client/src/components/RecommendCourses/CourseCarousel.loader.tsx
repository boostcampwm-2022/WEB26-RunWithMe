import CardLoader from "#components/Card/Card.loader";
import Carousel from "#components/Carousel/Carousel";

const CourseCarouselLoader = () => {
    return (
        <Carousel>
            {new Array(10).fill(0).map((_, idx: number) => (
                <CardLoader key={idx} />
            ))}
        </Carousel>
    );
};

export default CourseCarouselLoader;
