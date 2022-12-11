import { lazy } from "react";

export const MainPage = lazy(() => import("#pages/Main/MainPage"));
export const MyPage = lazy(() => import("#pages/MyPage/MyPage"));
export const SignUp = lazy(() => import("#pages/SignUp/SignUp"));
export const Login = lazy(() => import("#pages/Login/Login"));
export const Courses = lazy(() => import("#pages/Courses/Courses"));
export const Recruits = lazy(() => import("#pages/Recruits/Recruits"));
export const NewCourse = lazy(() => import("#pages/NewCourse/NewCourse"));
export const CourseDetail = lazy(() => import("#pages/CourseDetail/CourseDetail"));
export const RecruitDetail = lazy(() => import("#pages/RecruitDetail/RecruitDetail"));
export const MockCourses = lazy(() => import("#pages/MockCourses"));
export const MockRecruits = lazy(() => import("#pages/MockRecruits"));
