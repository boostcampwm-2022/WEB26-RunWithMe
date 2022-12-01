import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Repository } from "typeorm";
import { UserRecruit } from "../entities/user_recruit.entity";

@CustomRepository(UserRecruit)
export class UserRecruitRepository extends Repository<UserRecruit> {
    public async isParticipating(recruitId: number, userId: number): Promise<boolean> {
        const userRecruit = await this.createQueryBuilder("user_recruit")
            .where("user_recruit.recruitId = :recruitId", { recruitId })
            .andWhere("user_recruit.userId = :userId", { userId: userId || -1 })
            .getOne();
        if (userRecruit) {
            return true;
        }
        return false;
    }
    public async countCurrentPpl(recruitId: number) {
        return await this.countBy({ recruitId });
    }
    public createUserRecruit(userRecruitEntity: UserRecruit) {
        this.save(userRecruitEntity);
    }
}
