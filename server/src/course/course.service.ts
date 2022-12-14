import { Injectable } from "@nestjs/common";
import { Course } from "../common/entities/course.entity";
import { CourseRepository } from "../common/repositories/course.repository";
import { CreateCourseRequestDto } from "./dto/request/create-course.request";
import { GetCoursesRequestDto } from "./dto/request/get-courses.request";

@Injectable()
export class CourseService {
    constructor(private courseRepository: CourseRepository) {}

    async create(createCourseRequestDto: CreateCourseRequestDto): Promise<Course> {
        const courseEntity = createCourseRequestDto.toEntity();
        return this.courseRepository.createOne(courseEntity);
    }

    async getMany(queryParams: GetCoursesRequestDto) {
        if (queryParams.getQuery() === "") {
            return [];
        }

        if (!queryParams.getTitle() && !queryParams.getAuthor() && queryParams.getQuery()) {
            return [];
        }

        const courseList = await this.courseRepository.findAll(
            queryParams.getPage(),
            queryParams.getPageSize(),
            queryParams.getQuery(),
            queryParams.getTitle(),
            queryParams.getAuthor(),
            queryParams.getMinLength(),
            queryParams.getMaxLength(),
        );
        return courseList.map(({ id, title, path, pathLength, createdAt, user, hCode }) => {
            return {
                id,
                title,
                path: JSON.parse(path),
                pathLength,
                hDong: hCode,
                createdAt,
                userId: user.userId,
            };
        });
    }

    async getOne(recruitId: number) {
        const data = await this.courseRepository.findCourseDetail(recruitId);
        const { id, title, path, pathLength } = data;
        return { id, title, path: JSON.parse(path), pathLength, hDong: data.hCode, userId: data.user.userId };
    }

    async isExistingCourse(recruitId: number): Promise<boolean> {
        const courseEntity = await this.courseRepository.findOneById(recruitId);
        if (courseEntity) {
            return true;
        }
        return false;
    }

    async getCount() {
        const courseCount = await this.courseRepository.countAll();
        return courseCount;
    }
}
