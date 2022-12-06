import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetCourseRequestDto {
    @Type(() => Number)
    @IsNumber()
    @Expose({ name: "id" })
    private courseId: number;

    getCourseId() {
        return this.courseId;
    }
}
