import { RawRecruitData } from "../type/raw-recruit-data";

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
        course_name,
        course_createdAt,
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
            path: course_path,
            pathLength: course_pathLength,
            hDong: {
                name: course_name,
            },
            createdAt: course_createdAt,
        },
    };
};
