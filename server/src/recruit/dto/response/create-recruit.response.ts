import { instanceToPlain, Expose, plainToInstance } from "class-transformer";
import { Recruit } from "../../../common/entities/recruit.entity";

export class CreateRecruitResponseDto {
    @Expose({ name: "id" })
    private recruitId: number;

    static fromEntity(recruit: Recruit): CreateRecruitResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(CreateRecruitResponseDto, data, { excludeExtraneousValues: true });
    }
}
