import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Repository } from "typeorm";
import { Course } from "src/entities/course.entity";

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {
    async createOne(courseEntity: Course): Promise<Course> {
        return this.save(courseEntity);
    }
}
