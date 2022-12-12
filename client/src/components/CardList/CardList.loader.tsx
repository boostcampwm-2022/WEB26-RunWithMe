import CardLoader from "#components/Card/Card.loader";
import { CardWrapper } from "./CardList.styles";

const CardListLoader = () => {
    return (
        <CardWrapper>
            {new Array(10).fill(0).map((_, idx) => (
                <CardLoader key={idx} />
            ))}
        </CardWrapper>
    );
};

export default CardListLoader;
