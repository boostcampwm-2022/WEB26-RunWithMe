import { Recruit } from "../../entities/recruit.entity";

export class CreateRecruitDto {
    private title: string;
    private startTime: Date;
    private maxPpl: number;
    private pace: number;
    private zipCode: string;
    private userId: number;
    private courseId: number;

    toRecruitEntity() {
        return Recruit.from(
            this.title,
            this.startTime,
            this.maxPpl,
            this.pace,
            this.zipCode,
            this.userId,
            this.courseId,
        );
    }
}
