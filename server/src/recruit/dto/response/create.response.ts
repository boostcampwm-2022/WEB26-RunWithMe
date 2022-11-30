import { instanceToPlain, Expose, plainToInstance } from "class-transformer";
import { Recruit } from "../../../common/entities/recruit.entity";

export class CreateResponseDto {
    @Expose({ name: "id" })
    private recruitId: number;

    static fromEntity(recruit: Recruit): CreateResponseDto {
        const data = instanceToPlain(recruit);
        return plainToInstance(CreateResponseDto, data, { excludeExtraneousValues: true });
    }
}
