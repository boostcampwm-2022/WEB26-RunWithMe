import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Recruit } from "./recruit.entity";

@Entity()
export class UserRecruit {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRecruits)
    user: User;

    @ManyToOne(() => Recruit, (recruit) => recruit.userRecruits)
    recruit: Recruit;
}
