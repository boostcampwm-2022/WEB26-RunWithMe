import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        const isPresent = await this.userRepository.findByUserId(createUserDto.getUserId());
        if (isPresent) {
            throw new BadRequestException();
        }
        const hashedPassword = bcrypt.hashSync(createUserDto.getPassword(), 10);
        createUserDto.setPassword(hashedPassword);
        const userEntity = createUserDto.toUserEntity();
        return this.userRepository.save(userEntity);
    }
}
