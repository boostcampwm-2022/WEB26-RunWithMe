import { Page } from "#types/Page";
import { lazy } from "react";

const ChatPage: Page = {
    lazy: lazy(() => import("#pages/Chat/ChatPage")),
    preLoad: () => import("#pages/Chat/ChatPage"),
};
const MainPage: Page = {
    lazy: lazy(() => import("#pages/Main/MainPage")),
    preLoad: () => import("#pages/Main/MainPage"),
};
const MyPage: Page = {
    lazy: lazy(() => import("#pages/MyPage/MyPage")),
    preLoad: () => import("#pages/MyPage/MyPage"),
};
const SignUp: Page = {
    lazy: lazy(() => import("#pages/SignUp/SignUp")),
    preLoad: () => import("#pages/SignUp/SignUp"),
};
const Login: Page = {
    lazy: lazy(() => import("#pages/Login/Login")),
    preLoad: () => import("#pages/Login/Login"),
};
const Courses: Page = {
    lazy: lazy(() => import("#pages/Courses/Courses")),
    preLoad: () => import("#pages/Courses/Courses"),
};
const Recruits: Page = {
    lazy: lazy(() => import("#pages/Recruits/Recruits")),
    preLoad: () => import("#pages/Recruits/Recruits"),
};
const NewCourse: Page = {
    lazy: lazy(() => import("#pages/NewCourse/NewCourse")),
    preLoad: () => import("#pages/NewCourse/NewCourse"),
};
const CourseDetail: Page = {
    lazy: lazy(() => import("#pages/CourseDetail/CourseDetail")),
    preLoad: () => import("#pages/CourseDetail/CourseDetail"),
};
const RecruitDetail: Page = {
    lazy: lazy(() => import("#pages/RecruitDetail/RecruitDetail")),
    preLoad: () => import("#pages/RecruitDetail/RecruitDetail"),
};
const MockCourses: Page = {
    lazy: lazy(() => import("#pages/MockCourses")),
    preLoad: () => import("#pages/MockCourses"),
};
const MockRecruits: Page = {
    lazy: lazy(() => import("#pages/MockRecruits")),
    preLoad: () => import("#pages/MockRecruits"),
};

export {
    ChatPage,
    MainPage,
    MyPage,
    SignUp,
    Login,
    Courses,
    Recruits,
    NewCourse,
    CourseDetail,
    RecruitDetail,
    MockCourses,
    MockRecruits,
};
