import Header from "#components/Header/Header";
import RecommendCourses from "#components/RecommendCourses/RecommendCourses";
import RecommendRecruits from "#components/RecommendRecruits/RecommendRecruits";
import styled from "styled-components";

const MainPageContainer = styled.div`
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100vh;
    > div:first-child {
        margin-bottom: 16px;
    }
    > div:last-child {
        margin-top: 48px;
    }
`;

const MainPage = () => {
    return (
        <MainPageContainer>
            <Header isMain={true} text="RunWithMe" />
            <RecommendCourses />
            <RecommendRecruits />
        </MainPageContainer>
    );
};

export default MainPage;
