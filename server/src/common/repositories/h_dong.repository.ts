import { CustomRepository } from "src/common/typeorm/typeorm.decorator";
import { HDong } from "src/common/entities/h_dong.entity";
import { Repository } from "typeorm";

@CustomRepository(HDong)
export class HDongRepository extends Repository<HDong> {}
