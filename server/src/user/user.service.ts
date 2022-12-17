import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UserRepository } from "../common/repositories/user.repository";
import { CreateUserRequestDto } from "./dto/request/create-user.request";
import { CheckUserRequestDto } from "./dto/request/check-user.request";
import { CourseRepository } from "../common/repositories/course.repository";
import { RecruitRepository } from "../common/repositories/recruit.repository";
import { plainToGetRecruitDto } from "../common/utils/plainToGetRecruitDto";

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private courseRepository: CourseRepository,
        private recruitRepository: RecruitRepository,
    ) {}

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

    async getCoursesByUserIdx(_userIdx: number) {
        const coursesByUser = await this.courseRepository.findManyByUser(_userIdx);
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

    async getRecruitsByUserIdx(_userIdx: number) {
        const recruitsByUser = await this.recruitRepository.findManyByUser(_userIdx);
        return recruitsByUser.map(plainToGetRecruitDto);
    }

    async getProfileByUserIdx(_userIdx: number) {
        const userProfile = await this.userRepository.findOneProfileByUserIdx(_userIdx);
        const { userId, pace, h_dong_name } = userProfile;

        return { userId, hDong: { name: h_dong_name }, pace };
    }
}
