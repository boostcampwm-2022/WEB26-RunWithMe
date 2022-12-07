import RecruitCard from "#components/Card/RecruitCard/RecruitCard";
import RecruitTextCard from "#components/Card/RecruitTextCard/RecruitTextCard";
import { MYPAGE } from "#constants/myPageOptions";
import useMyRecruitsQuery from "#hooks/queries/useMyRecruitsQuery";
import { Recruit } from "#types/Recruit";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import { MyPageMenuInfo } from "./MyPage.styles";
import { MyPageProps } from "./MyPageTypes";

const RecruitsWrapper = styled.div`
    ${flexColumn}
    padding : 10px 30px;
    gap: 10px;
`;

const MyPageRecruits = ({ MyPageOption }: MyPageProps) => {
    const { data: recruit, isLoading: recruitsLoading } = useMyRecruitsQuery();
    if (recruitsLoading) return <div>Loading...</div>;
    if (!recruit) return <div>404</div>;

    return (
        <>
            {MyPageOption == MYPAGE.RECRUITS && (
                <>
                    <MyPageMenuInfo>내가 신청한 모집</MyPageMenuInfo>
                    <RecruitsWrapper>
                        {recruit.data.map((r: Recruit, idx: number) => (
                            <RecruitCard data={r} key={idx} />
                        ))}
                    </RecruitsWrapper>
                </>
            )}
        </>
    );
};

export default MyPageRecruits;
