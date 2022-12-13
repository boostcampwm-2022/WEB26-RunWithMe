import { userState } from "#atoms/userState";
import { ChatResponse } from "#types/Chat";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#types/flexOptions";
import { timeDifference } from "#utils/cardUtils";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { COLOR } from "styles/color";
import { flexColumn, flexRow } from "styles/flex";
import { fontXSmall } from "styles/font";

interface ChatItemProps {
    data: ChatResponse;
}

const ChatItemContainer = styled.div<{ isMine: boolean }>`
    width: 100%;
    ${flexRow({ alignItems: ALIGN_ITEMS.FLEX_END })};
    justify-content: ${({ isMine }) => (isMine ? JUSTIFY_CONTENT.RIGHT : JUSTIFY_CONTENT.LEFT)};
    flex-direction: ${({ isMine }) => (isMine ? "row-reverse" : "row")};
    margin-top: 15px;
    > span {
        ${fontXSmall(COLOR.BLACK, 400)}
        margin:0 6px;
    }
`;

const ContentWrapper = styled.div<{ isMine: boolean }>`
    ${flexColumn({})};
    background-color: ${({ isMine }) => (isMine ? COLOR.PRIMARY : COLOR.F1F4F7)};
    color: ${({ isMine }) => (isMine ? COLOR.WHITE : COLOR.BLACK)};
    padding: 8px 16px;
    border-radius: 15px;
    font-size: 1.4rem;
    max-width: 50%;
    span {
        white-space: normal;
        word-break: break-word;
        word-wrap: break-word;
    }
    span:not(:last-child) {
        font-weight: ${700};
    }
    span:last-child {
        font-weight: ${400};
    }
`;

const ChatItem = ({ data }: ChatItemProps) => {
    const { userId } = useRecoilValue(userState);
    const isMine = data.sender === userId;
    return (
        <ChatItemContainer isMine={isMine}>
            <ContentWrapper isMine={isMine}>
                {userId !== data.sender && <span>{data.sender}</span>}
                <span>{data.content}</span>
            </ContentWrapper>
            <span>
                {timeDifference(
                    new Date(new Date(data.createdAt).getTime() + new Date().getTimezoneOffset() * 60000).toISOString(),
                )}
            </span>
        </ChatItemContainer>
    );
};

export default ChatItem;
