import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Repository } from "typeorm";
import { UserRecruit } from "./entities/user_recruit.entity";

@CustomRepository(UserRecruit)
export class UserRecruitRepository extends Repository<UserRecruit> {
    public async isParticipate(recruitId: number, userId: number): Promise<boolean> {
        const participants = await this.createQueryBuilder("user_recruit")
            .select("userId")
            .where("user_recruit.recruitId = :recruitId", { recruitId })
            .andWhere("user_recruit.userId = :userId", { userId })
            .execute();
        if (participants.length !== 0) {
            return true;
        }
        return false;
    }
    public async countCurrentPpl(recruitId: number) {
        return await this.countBy({ recruitId });
    }
}
