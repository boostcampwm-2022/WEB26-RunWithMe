import { CustomRepository } from "../typeorm/typeorm.decorator";
import { HDong } from "../entities/h_dong.entity";
import { Repository } from "typeorm";

@CustomRepository(HDong)
export class HDongRepository extends Repository<HDong> {}
