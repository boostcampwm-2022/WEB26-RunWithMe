import { CustomRepository } from "../typeorm/typeorm.decorator";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { HDong } from "../entities/h_dong.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    public createUser(userEntity: User) {
        return this.save(userEntity);
    }

    public findOneByUserId(userId: string) {
        return this.findOneBy({ userId });
    }

    public async findUserIdxByUserId(userId: string) {
        return (await this.findOneByUserId(userId)).id;
    }

    public findOneProfileByUserIdx(userIdx: number) {
        return this.createQueryBuilder("user")
            .leftJoinAndSelect(HDong, "h_dong", "user.hCode = h_dong.code")
            .where("user.id=:userIdx", { userIdx })
            .select(["user.userId AS userId", "user.pace AS pace", "h_dong.name"])
            .getRawOne();
    }
}
