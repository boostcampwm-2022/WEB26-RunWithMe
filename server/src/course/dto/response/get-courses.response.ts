import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { GetCourseResponseDto } from "src/course/dto/response/get-course.response";

export class GetCoursesResponseDto {
    @Expose()
    @Type(() => GetCourseResponseDto)
    course: GetCourseResponseDto;

    static fromEntity(course: any): GetCoursesResponseDto {
        const data = instanceToPlain(course);
        return plainToInstance(GetCoursesResponseDto, data, { excludeExtraneousValues: true });
    }
}
