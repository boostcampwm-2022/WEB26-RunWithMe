import { IsNumber, IsNumberString, IsString } from "class-validator";
import { isValidPath } from "src/common/decorators/path.validator";
import { LatLng } from "src/common/types/lat-lng";
import { Course } from "src/common/entities/course.entity";

export class CreateCourseDto {
    @IsString()
    private title: string;

    @isValidPath()
    private path: LatLng[];

    @IsNumber()
    private pathLength: number;

    @IsNumber()
    private userId: number;

    @IsNumberString()
    private hCode: string;

    toEntity() {
        return Course.of(this.title, this.path, this.pathLength, this.hCode, this.userId);
    }
}
