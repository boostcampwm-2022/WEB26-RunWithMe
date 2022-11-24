import { Injectable } from "@nestjs/common";
import { RecruitRepository } from "./recruit.repository";
import { CreateRecruitDto } from "./dto/create-recruit.dto";
import { Recruit } from "src/entities/recruit.entity";
import { UserRecruitRepository } from "src/user_recruit.repository";

@Injectable()
export class RecruitService {
    constructor(private recruitRepository: RecruitRepository, private userRecruitRepository: UserRecruitRepository) {}
    async create(createRecruitDto: CreateRecruitDto): Promise<Recruit> {
        const recruitEntity = createRecruitDto.toEntity();
        return this.recruitRepository.createOne(recruitEntity);
    }

    async getRecruitList(page: number, pageSize: number) {
        const recruitList = await this.recruitRepository.findAll(page, pageSize);
        return recruitList.map(
            ({
                id,
                title,
                startTime,
                maxPpl,
                currentPpl,
                createdAt,
                userId,
                course_id,
                course_title,
                course_img,
                course_path,
                course_pathLength,
                course_name,
                course_createdAt,
            }) => {
                return {
                    id,
                    title,
                    startTime,
                    maxPpl,
                    currentPpl: parseInt(currentPpl),
                    userId,
                    createdAt,
                    course: {
                        id: course_id,
                        title: course_title,
                        img: course_img,
                        path: JSON.parse(course_path),
                        pathLength: course_pathLength,
                        hDong: {
                            course_name,
                        },
                        createdAt: course_createdAt,
                    },
                };
            },
        );
    }

    async isExistRecruit(recruitId: number): Promise<number | null> {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        if (recruitEntity) {
            return recruitEntity.userId;
        }
        return null;
    }

    async isParticipating(recruitId: number, userId: number): Promise<boolean> {
        return this.userRecruitRepository.isParticipate(recruitId, userId);
    }

    async isVacancy(recruitId: number): Promise<boolean> {
        const currentPpl = await this.userRecruitRepository.countCurrentPpl(recruitId);
        const maxPpl = await this.recruitRepository.getMaxPpl(recruitId);
        if (currentPpl < maxPpl) {
            return true;
        }
        return false;
    }

    async isAuthorOfRecruit(recruitId: number, userId: number) {
        const recruitEntity = await this.recruitRepository.findOneById(recruitId);
        return recruitEntity.userId === userId;
    }
}
