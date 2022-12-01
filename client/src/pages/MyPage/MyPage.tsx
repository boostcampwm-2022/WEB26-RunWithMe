import Button from "#components/Button/Button";
import Header from "#components/Header/Header";
import { Menu, MenuWrapper, MyInfoContainer } from "./MyPage.styles";
const MyPage = () => {
    return (
        <div>
            <Header text="마이페이지"></Header>
            <MenuWrapper>
                <Menu>내 정보</Menu>
                <Menu>코스 목록</Menu>
                <Menu>참여 </Menu>
            </MenuWrapper>
            <MyInfoContainer>
                <Button width="fill">회원정보 변경</Button>
            </MyInfoContainer>
        </div>
    );
};

export default MyPage;
