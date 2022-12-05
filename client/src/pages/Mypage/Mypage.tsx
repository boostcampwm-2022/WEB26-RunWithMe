import Header from "#components/Header/Header";
import { useState } from "react";
import { MYPAGE } from "#constants/myPageOptions";
import MyPageProfile from "./MyPageProfile";
import { Menu, MenuWrapper } from "./MyPage.styles";
import MyPageCourses from "./MyPageCourses";
import MyPageRecruits from "./MyPageRecruits";

const MyPage = () => {
    const [myPageOption, setMyPageOption] = useState(MYPAGE.PROFILE);

    return (
        <div>
            <Header text="마이페이지"></Header>
            <MenuWrapper>
                <Menu enabled={myPageOption == MYPAGE.PROFILE} onClick={() => setMyPageOption(MYPAGE.PROFILE)}>
                    내 정보
                </Menu>
                <Menu enabled={myPageOption == MYPAGE.COURSES} onClick={() => setMyPageOption(MYPAGE.COURSES)}>
                    코스 목록
                </Menu>
                <Menu enabled={myPageOption == MYPAGE.RECRUITS} onClick={() => setMyPageOption(MYPAGE.RECRUITS)}>
                    참여
                </Menu>
            </MenuWrapper>
            <MyPageProfile MyPageOption={myPageOption}></MyPageProfile>
            <MyPageCourses MyPageOption={myPageOption}></MyPageCourses>
            <MyPageRecruits MyPageOption={myPageOption}></MyPageRecruits>
        </div>
    );
};

export default MyPage;
