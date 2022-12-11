import { Route, Routes } from "react-router-dom";
import useRefreshQuery from "#hooks/queries/useRefreshQuery";
import Layout from "#components/Layout/Layout";
import { Suspense } from "react";
import Loading from "#components/commons/Loading/Loading";
import * as P from "#pages/index";

function App() {
    useRefreshQuery();
    return (
        <Layout>
            <Suspense fallback={<Loading />}>
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
                    </Route>
                    <Route path="mock">
                        <Route path="courses" element={<P.MockCourses />} />
                        <Route path="recruits" element={<P.MockRecruits />} />
                    </Route>
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App;
