import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { Recruit } from "src/entities/recruit.entity";
import { Repository } from "typeorm";

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
    public createRecruit(recruitEntity: Recruit) {
        return this.save(recruitEntity);
    }
}
