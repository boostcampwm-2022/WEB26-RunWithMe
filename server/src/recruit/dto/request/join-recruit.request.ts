import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { UserRecruit } from "../../../common/entities/user_recruit.entity";

export class JoinRecruitRequestDto {
    @Type(() => Number)
    @IsNumber()
    private recruitId: number;

    @Type(() => Number)
    @IsNumber()
    private userId: number;

    getRecruitId() {
        return this.recruitId;
    }

    getUserId() {
        return this.userId;
    }

    toEntity() {
        return UserRecruit.of(this.userId, this.recruitId);
    }
}
