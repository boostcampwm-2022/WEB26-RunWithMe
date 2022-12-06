import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../common/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { CheckUserDto } from "./dto/check-user.dto";
import { CourseRepository } from "src/common/repositories/course.repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private courseRepository: CourseRepository) {}

    async create(createUserDto: CreateUserDto) {
        const isPresent = await this.userRepository.findOneByUserId(createUserDto.getUserId());
        if (isPresent) {
            throw new BadRequestException();
        }
        const hashedPassword = bcrypt.hashSync(createUserDto.getPassword(), 10);
        createUserDto.setPassword(hashedPassword);
        const userEntity = createUserDto.toUserEntity();
        return this.userRepository.save(userEntity);
    }

    async checkId(checkUserDto: CheckUserDto) {
        if (await this.userRepository.findOneByUserId(checkUserDto.getUserId())) {
            return {
                statusCode: 200,
                exists: true,
            };
        }
        return {
            statusCode: 200,
            exists: false,
        };
    }

    async getCoursesByUserId(_userId: number) {
        const coursesByUser = await this.courseRepository.findManyByUser(_userId);
        return coursesByUser.map(({ id, title, path, pathLength, createdAt, user, hCode }) => {
            return {
                id,
                title,
                path: JSON.parse(path),
                pathLength,
                hDong: hCode,
                createdAt,
                userId: user.userId,
            };
        });
    }
}
