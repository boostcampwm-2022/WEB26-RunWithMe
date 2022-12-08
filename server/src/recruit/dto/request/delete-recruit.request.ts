import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeleteRecruitRequestDto {
    @Type(() => Number)
    @IsNumber()
    @Expose({ name: "id" })
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
}
