import RecruitCard from "#components/Card/RecruitCard/RecruitCard";
import { MYPAGE } from "#constants/myPageOptions";
import useMyRecruitsQuery from "#hooks/queries/useMyRecruitsQuery";
import { Recruit } from "#types/Recruit";
import styled from "styled-components";
import { flexColumn } from "styles/flex";
import { MyPageMenuInfo, MyPageOptionsWrapper } from "./MyPage.styles";
import { MyPageProps } from "./MyPageTypes";
import Switch from "@mui/material/switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "#atoms/userState";

const RecruitsWrapper = styled.div`
    ${flexColumn}
    padding : 10px 30px;
    gap: 10px;
`;

const MyPageRecruits = ({ MyPageOption }: MyPageProps) => {
    const { data: recruits, isLoading: recruitsLoading } = useMyRecruitsQuery();
    const [myRecruitsToggled, setMyRecruitsToggled] = useState(false);
    const [pastRecruitsToggled, setPastRecruitsToggled] = useState(false);
    const [userInfo] = useRecoilState(userState);

    const handleMyRecruitsToggle = () => {
        setMyRecruitsToggled(!myRecruitsToggled);
    };

    const handlePastRecruitsToggle = () => {
        setPastRecruitsToggled(!pastRecruitsToggled);
    };

    const filterPastRecruits = (recruits: Recruit[]) => {
        return recruits.filter((recruit) => {
            if (new Date(recruit.startTime) < new Date()) return false;
            return true;
        });
    };

    const filterMyRecruits = (recruits: Recruit[]) => {
        return recruits.filter((recruit) => {
            if (recruit.userId === userInfo.userId) return true;
            return false;
        });
    };

    if (recruitsLoading) return <div>Loading...</div>;
    if (!recruits) return <div>404</div>;

    const createRecruitData = () => {
        let filteredRecruit = recruits.data;
        if (!pastRecruitsToggled) filteredRecruit = filterPastRecruits(filteredRecruit);
        if (myRecruitsToggled) filteredRecruit = filterMyRecruits(filteredRecruit);

        return filteredRecruit.map((r: Recruit, idx: number) => <RecruitCard data={r} key={idx} />);
    };

    return (
        <>
            {MyPageOption == MYPAGE.RECRUITS && (
                <>
                    <MyPageMenuInfo>내가 신청한 모집</MyPageMenuInfo>
                    <MyPageOptionsWrapper>
                        <FormGroup row={true} sx={{ width: "70%", display: "flex", justifyContent: "space-between" }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={myRecruitsToggled}
                                        onChange={handleMyRecruitsToggle}
                                        size="small"
                                    />
                                }
                                label="내가 만든 모집만 보기"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={pastRecruitsToggled}
                                        onChange={handlePastRecruitsToggle}
                                        size="small"
                                    />
                                }
                                label="지난 모집 보기"
                            />
                        </FormGroup>
                    </MyPageOptionsWrapper>
                    <RecruitsWrapper>{createRecruitData()}</RecruitsWrapper>
                </>
            )}
        </>
    );
};

export default MyPageRecruits;
