import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    public createUser(userEntity: User) {
        return this.save(userEntity);
    }

    public async findByUserId(userId: string): Promise<User | undefined> {
        return this.findOneBy({ userId });
    }
}
