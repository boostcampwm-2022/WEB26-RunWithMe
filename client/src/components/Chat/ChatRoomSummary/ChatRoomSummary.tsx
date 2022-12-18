import useRecruitDetailQuery from "#hooks/queries/useRecruitDetailQuery";
import { RecruitDetail } from "#types/RecruitDetail";
import { number } from "prop-types";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { fontMedium } from "styles/font";
const SummaryWrapper = styled.div`
    width: 100%;
    padding: 15px 20px;
    background-color: ${COLOR.F1F4F7};
    border-radius: 0 0 16px 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    z-index: 30;
    h2 {
        margin-bottom: 4px;
    }
    li {
        ${fontMedium(COLOR.BLACK, 500)};
        margin-bottom: 2px;
        list-style: none;
    }
`;

interface ChatRoomSummaryProps {
    data: RecruitDetail;
}

const ChatRoomSummary = ({ data }: ChatRoomSummaryProps) => {
    return (
        <SummaryWrapper>
            <h2>{data?.title}</h2>
            <ul>
                <li>집합 일시: {(data?.startTime ? new Date(data?.startTime) : new Date()).toLocaleString()}</li>
                <li>출발점: {data?.hDong.name}</li>
                <li>총거리: {((data?.pathLength || 0) / 1000).toFixed(2)}km</li>
            </ul>
        </SummaryWrapper>
    );
};

export default ChatRoomSummary;
