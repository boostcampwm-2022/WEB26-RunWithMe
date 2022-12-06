import { CustomRepository } from "../typeorm/typeorm.decorator";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

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
}
