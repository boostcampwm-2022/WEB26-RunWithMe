import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { UserRecruit } from "src/entities/user_recruit.entity";
import { Repository } from "typeorm";

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

    public async getAttendeeCntQb() {
        const attendeeCntQb = this.createQueryBuilder()
            .subQuery()
            .select(["COUNT(userRecruit.userId) AS currentPpl", "userRecruit.recruitId AS recruitId"])
            .groupBy("userRecruit.recruitId")
            .getQuery();

        return attendeeCntQb;
    }
}
