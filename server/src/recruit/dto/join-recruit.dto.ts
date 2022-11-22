import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { UserRecruit } from "../../entities/user_recruit.entity";

export class JoinRecruitDto {
    @Type(() => Number)
    @IsNumber()
    private recruitId: number;

    @Type(() => Number)
    @IsNumber()
    private userId: number;

    toEntity() {
        return null;
    }
}
