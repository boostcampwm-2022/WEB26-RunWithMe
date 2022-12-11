import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexRow } from "styles/flex";
const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    ${flexRow({ alignItems: ALIGN_ITEMS.CENTER, justifyContent: JUSTIFY_CONTENT.CENTER })}
`;
const Loading = () => {
    return (
        <LoadingWrapper>
            <BeatLoader color={COLOR.PRIMARY} />
        </LoadingWrapper>
    );
};

export default Loading;
