import { Injectable } from "@nestjs/common";
import { Course } from "src/common/entities/course.entity";
import { CourseRepository } from "../common/repositories/course.repository";
import { CreateCourseDto } from "./dto/request/create-course.dto";
import { GetCourseDto } from "./dto/request/get-course.dto";

@Injectable()
export class CourseService {
    constructor(private courseRepository: CourseRepository) {}

    async create(createRecruitDto: CreateCourseDto): Promise<Course> {
        const courseEntity = createRecruitDto.toEntity();
        return this.courseRepository.createOne(courseEntity);
    }

    async getMany(queryParams: GetCourseDto) {
        if (queryParams.getQuery() === "") {
            return [];
        }

        if (!queryParams.getTitle() && !queryParams.getAuthor()) {
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

        return courseList.map(({ id, title, img, path, pathLength, createdAt, user, hCode }) => {
            return {
                id,
                title,
                img,
                path: JSON.parse(path),
                pathLength,
                hDong: hCode,
                createdAt,
                user,
            };
        });
    }

    async getOne(recruitId: number) {
        const data = await this.courseRepository.findCourseDetail(recruitId);
        const { title, path, pathLength } = data;
        return { title, path, pathLength, hDong: data.hCode, userId: data.user.userId };
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
        console.log(courseCount);
        return courseCount;
    }
}
