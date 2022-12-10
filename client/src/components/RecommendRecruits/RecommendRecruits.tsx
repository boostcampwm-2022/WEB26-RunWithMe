import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCard";
import Carousel from "#components/Carousel/Carousel";
import MoreButton from "#components/MoreButton/MoreButton";
import useRecruitsQuery from "#hooks/queries/useRecruitsQuery";
import { JUSTIFY_CONTENT } from "#types/flexOptions";
import { Recruit } from "#types/Recruit";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
import { fontXLarge } from "styles/font";
const TitleWrapper = styled.div`
    ${flexRow({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
    padding: 0px 10px;
    > span {
        ${fontXLarge(COLOR.BLACK, 500)};
    }
`;

const RecommendRecruits = () => {
    const { data } = useRecruitsQuery({});
    return (
        <div>
            <TitleWrapper>
                <span>코스 목록</span>
                <MoreButton to="/courses" />
            </TitleWrapper>
            <Carousel>
                {data?.pages[0].map((c: Recruit, idx: number) => (
                    <RecruitTextCard data={c} key={idx} />
                ))}
            </Carousel>
        </div>
    );
};

export default RecommendRecruits;
