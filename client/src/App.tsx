import { Route, Routes } from "react-router-dom";
import useRefreshQuery from "#hooks/queries/useRefreshQuery";
import Layout from "#components/Layout/Layout";
import * as Pages from "#pages/index";

function App() {
    useRefreshQuery();
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Pages.MainPage.lazy />} />
                <Route path="me" element={<Pages.MyPage.lazy />} />
                <Route path="signup" element={<Pages.SignUp.lazy />} />
                <Route path="login" element={<Pages.Login.lazy />} />
                <Route path="courses" element={<Pages.Courses.lazy />} />
                <Route path="recruits" element={<Pages.Recruits.lazy />} />
                <Route path="course">
                    <Route path="new" element={<Pages.NewCourse.lazy />} />
                    <Route path=":id" element={<Pages.CourseDetail.lazy />} />
                </Route>
                <Route path="recruit">
                    <Route path=":id" element={<Pages.RecruitDetail.lazy />} />
                    <Route path=":id/chat" element={<Pages.ChatPage.lazy />} />
                </Route>
                <Route path="mock">
                    <Route path="courses" element={<Pages.MockCourses.lazy />} />
                    <Route path="recruits" element={<Pages.MockRecruits.lazy />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
