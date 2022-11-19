import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async create(createUserDTO: CreateUserDto) {
        if (await this.findByUserId(createUserDTO.getUserId())) {
            throw new BadRequestException();
        }
        createUserDTO.setPassword(bcrypt.hashSync(createUserDTO.getPassowrd(), 10));
        const user = createUserDTO.toUserEntity();
        await this.userRepository.save(user);
        return { status: 201 };
    }

    async findByUserId(userId: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({ userId });
    }
}
