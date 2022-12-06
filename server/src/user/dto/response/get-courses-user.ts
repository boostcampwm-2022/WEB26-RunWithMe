import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { CourseResponseDto } from "src/course/dto/response/get-one.response";

export class GetCoursesUserDto {
    @Expose()
    @Type(() => CourseResponseDto)
    course: CourseResponseDto;

    static fromEntity(course: any): GetCoursesUserDto {
        const data = instanceToPlain(course);
        // OK
        const dto = plainToInstance(GetCoursesUserDto, data, { excludeExtraneousValues: false });
        console.log(dto);
        return dto;
    }
}
