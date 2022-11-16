import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/userDTO";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(userDTO: UserDTO) {
        if (await this.findByUserId(userDTO.userId)) {
            return { status: 400 };
        }
        userDTO.password = bcrypt.hashSync(userDTO.password, 10);
        await this.userRepository.save(userDTO);
        return { status: 201 };
    }

    async findByUserId(userId: string): Promise<UserDTO | undefined> {
        return await this.userRepository.findOneBy({ userId });
    }
}
