import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Recruit } from "../../../common/entities/recruit.entity";

export class CreateRecruitReqDto {
    @IsString()
    private title: string;

    @Type(() => Date)
    private startTime: Date;

    @Type(() => Number)
    @IsNumber()
    private maxPpl: number;

    @Type(() => Number)
    @IsNumber()
    private pace: number;

    @Type(() => Number)
    @IsNumber()
    private userId: number;

    @Type(() => Number)
    @IsNumber()
    private courseId: number;

    toEntity(): Recruit {
        return Recruit.of(this.title, this.startTime, this.maxPpl, this.pace, this.userId, this.courseId);
    }
}
