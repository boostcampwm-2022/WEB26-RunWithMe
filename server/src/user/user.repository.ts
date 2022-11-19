import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    public async createUser() {
        const user = new User();
        user.userId = "1234";
        user.password = "123123123125";
        user.pace = 1234;
        user.zipCode = "12344";
        const createdUser = this.save(user);
        return createdUser;
    }
}
