import { Type } from "class-transformer";
import { IsNumber, IsNumberString, IsString } from "class-validator";
import { IsValidDateTime } from "src/common/decorator";
import { Recruit } from "../../entities/recruit.entity";

export class CreateRecruitDto {
    @IsString()
    private title: string;

    @IsValidDateTime()
    private startTime: Date;

    @Type(() => Number)
    @IsNumber()
    private maxPpl: number;

    @Type(() => Number)
    @IsNumber()
    private pace: number;

    @IsNumberString()
    private hCode: string;

    @Type(() => Number)
    @IsNumber()
    private userId: number;

    @Type(() => Number)
    @IsNumber()
    private courseId: number;

    getHCode(): string {
        return this.hCode;
    }

    setHCodeToName(name: string): void {
        this.hCode = name;
    }

    toEntity(): Recruit {
        return Recruit.of(this.title, this.startTime, this.maxPpl, this.pace, this.hCode, this.userId, this.courseId);
    }
}
