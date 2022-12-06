import { instanceToPlain, Expose, plainToInstance, Type } from "class-transformer";
import { CourseResponseDto } from "../../../course/dto/response/get-one.response";

export class GetManyResponseDto {
    @Expose()
    @Type(() => CourseResponseDto)
    course: CourseResponseDto;

    static fromEntity(course: any): GetManyResponseDto {
        const data = instanceToPlain(course);
        console.log(data);
        const dto = plainToInstance(GetManyResponseDto, data, { excludeExtraneousValues: true });
        console.log("DTO: ", dto);
        return dto;
        // return plainToInstance(GetManyResponseDto, course);
    }
}
