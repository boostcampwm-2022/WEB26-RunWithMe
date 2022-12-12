import { Route, Routes } from "react-router-dom";
import useRefreshQuery from "#hooks/queries/useRefreshQuery";
import Layout from "#components/Layout/Layout";
import * as P from "#pages/index";

function App() {
    useRefreshQuery();
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<P.MainPage />} />
                <Route path="me" element={<P.MyPage />} />
                <Route path="signup" element={<P.SignUp />} />
                <Route path="login" element={<P.Login />} />
                <Route path="courses" element={<P.Courses />} />
                <Route path="recruits" element={<P.Recruits />} />
                <Route path="course">
                    <Route path="new" element={<P.NewCourse />} />
                    <Route path=":id" element={<P.CourseDetail />} />
                </Route>
                <Route path="recruit">
                    <Route path=":id" element={<P.RecruitDetail />} />
                    <Route path=":id/chat" element={<P.ChatPage />} />
                </Route>
                <Route path="mock">
                    <Route path="courses" element={<P.MockCourses />} />
                    <Route path="recruits" element={<P.MockRecruits />} />
                </Route>
            </Routes>
        </Layout>
    );
}

export default App;
