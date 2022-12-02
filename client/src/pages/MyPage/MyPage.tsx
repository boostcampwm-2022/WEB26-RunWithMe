import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import { Menu, MenuWrapper, MyInfoWrapper, MyInfo, MyName } from "./MyPage.styles";
const MyPage = () => {
    return (
        <div>
            <Header text="마이페이지"></Header>
            <MenuWrapper>
                <Menu>내 정보</Menu>
                <Menu>코스 목록</Menu>
                <Menu>참여 </Menu>
            </MenuWrapper>
            <MyInfoWrapper>
                <MyName>catenary</MyName>
                <MyInfo>
                    <span>지역</span>
                    <span>경기도 용인시 수지구 동천동</span>
                </MyInfo>
                <MyInfo>
                    <span>페이스</span>
                    <span>3min/km</span>
                </MyInfo>
                <Button width="fill">회원정보 변경</Button>
            </MyInfoWrapper>
        </div>
    );
};

export default MyPage;
