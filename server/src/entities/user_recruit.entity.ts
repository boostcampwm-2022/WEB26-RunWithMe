import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Recruit } from "./recruit.entity";

@Entity("user_recruit")
export class UserRecruit {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.userRecruits)
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Recruit, (recruit) => recruit.userRecruits)
    @JoinColumn({ name: "recruitId", referencedColumnName: "id" })
    recruit: Recruit;

    @Column()
    recruitId: number;

    static of(userId: number, recruitId: number) {
        const userRecruit = new UserRecruit();
        userRecruit.userId = userId;
        userRecruit.recruitId = recruitId;
        return userRecruit;
    }
}
