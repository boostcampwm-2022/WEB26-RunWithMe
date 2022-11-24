import { Type } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";
import { isValidPath } from "src/common/decorator/path.validator";
import { LatLng } from "src/common/type/lat-lng";
import { Course } from "src/entities/course.entity";

export class CreateCourseDto {
    @IsString()
    private title: string;

    @IsString()
    private img: string;

    @isValidPath()
    private path: LatLng[];

    @IsNumber()
    private pathLength: number;

    @Type(() => Number)
    @IsNumber()
    private userId: number;

    @IsNumberString()
    private hCode: string;

    toEntity() {
        return Course.of(this.title, this.img, this.path, this.pathLength, this.hCode, this.userId);
    }
}
