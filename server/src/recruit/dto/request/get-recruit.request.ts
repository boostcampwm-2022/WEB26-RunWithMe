import { Expose, Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetRecruitRequestDto {
    @Type(() => Number)
    @IsNumber()
    @Expose({ name: "id" })
    private recruitId: number;

    @IsOptional()
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
