import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../common/repositories/user.repository";
import { CreateUserRequestDto } from "./dto/request/create-user.request";
import { CheckUserRequestDto } from "./dto/request/check-user.request";
import { CourseRepository } from "../common/repositories/course.repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private courseRepository: CourseRepository) {}

    async create(createUserRequestDto: CreateUserRequestDto) {
        const isPresent = await this.userRepository.findOneByUserId(createUserRequestDto.getUserId());
        if (isPresent) {
            throw new BadRequestException();
        }
        const hashedPassword = bcrypt.hashSync(createUserRequestDto.getPassword(), 10);
        createUserRequestDto.setPassword(hashedPassword);
        const userEntity = createUserRequestDto.toUserEntity();
        return this.userRepository.save(userEntity);
    }

    async checkId(checkUserDto: CheckUserRequestDto) {
        if (await this.userRepository.findOneByUserId(checkUserDto.getUserId())) {
            return {
                isExisting: true,
            };
        }
        return {
            isExisting: false,
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
