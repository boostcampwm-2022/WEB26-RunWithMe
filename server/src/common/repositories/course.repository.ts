import { CustomRepository } from "../typeorm/typeorm.decorator";
import { Repository } from "typeorm";
import { Course } from "../entities/course.entity";
import { BadRequestException } from "@nestjs/common";

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {
    async createOne(courseEntity: Course): Promise<Course> {
        return this.save(courseEntity);
    }

    async findCourseDetail(courseId: number) {
        return this.createQueryBuilder("course")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .innerJoinAndSelect("course.user", "user")
            .select(["course.title", "course.path", "course.pathLength", "user.userId", "h_dong.name"])
            .where("course.id = :courseId", { courseId })
            .getOne();
    }

    async findAll(
        page: number,
        pageSize: number,
        query?: string | undefined,
        title?: boolean | undefined,
        author?: boolean | undefined,
        minLen?: number | undefined,
        maxLen?: number | undefined,
    ) {
        return this.createQueryBuilder("course")
            .innerJoinAndSelect("course.user", "user")
            .innerJoinAndSelect("course.hCode", "h_dong")
            .where("1=1")
            .andWhere(maxLen && minLen >= 0 ? `course.pathLength >= :minLen and course.pathLength < :maxLen` : "1=1", {
                minLen,
                maxLen,
            })
            .andWhere(query && title && author ? `(course.title LIKE :query_title or user.userId = :query)` : "1=1", {
                query_title: "%" + query + "%",
                query,
            })
            .andWhere(query && title && author === false ? `course.title LIKE :query_title` : "1=1", {
                query_title: "%" + query + "%",
            })
            .andWhere(query && title === false && author ? `user.userId = :query` : "1=1", {
                query,
            })
            .select([
                "course.id",
                "course.title",
                "course.path",
                "course.pathLength",
                "h_dong.name",
                "course.createdAt",
                "user.userId",
            ])
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .getMany();
    }
    async findOneById(id: number): Promise<Course> {
        const data = await this.findOneBy({ id });
        if (!data) {
            throw new BadRequestException();
        }
        return data;
    }
    async countAll() {
        return await this.count();
    }
}
