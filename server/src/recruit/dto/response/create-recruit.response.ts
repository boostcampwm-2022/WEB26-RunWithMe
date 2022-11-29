import { ApiProperty } from "@nestjs/swagger";
import { instanceToPlain, Expose, plainToInstance } from "class-transformer";
import { Recruit } from "../../../common/entities/recruit.entity";

export class CreateRecruitResDto {
    @Expose({ name: "id" })
    private recruitId: number;

    static fromEntity(recruit: Recruit): CreateRecruitResDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(CreateRecruitResDto, data, { excludeExtraneousValues: true });
    }
}
