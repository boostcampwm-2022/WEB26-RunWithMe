import { RawRecruitData } from "../types/raw-recruit-data";

export const plainToGetRecruitDto = (plainRecruitData: RawRecruitData) => {
    const {
        id,
        title,
        startTime,
        maxPpl,
        currentPpl,
        createdAt,
        userId,
        pace,
        course_id,
        course_title,
        course_img,
        course_path,
        course_pathLength,
        h_dong_name,
        course_createdAt,
        course_userId,
    } = plainRecruitData;

    return {
        id,
        title,
        startTime,
        maxPpl,
        currentPpl: parseInt(currentPpl),
        userId,
        pace,
        createdAt,
        course: {
            id: course_id,
            title: course_title,
            img: course_img,
            path: JSON.parse(course_path),
            pathLength: course_pathLength,
            userId: course_userId,
            hDong: {
                name: h_dong_name,
            },
            createdAt: course_createdAt,
        },
    };
};
