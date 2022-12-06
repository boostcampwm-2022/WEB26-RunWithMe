import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { Recruit } from "./recruit.entity";
import { UserRecruit } from "./user_recruit.entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 20, unique: true })
    userId: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column()
    pace: number;

    @Column({ type: "varchar", length: 10 })
    hCode: string;

    @OneToMany(() => Course, (course) => course.user)
    courses: Course[];

    @OneToMany(() => Recruit, (recruit) => recruit.user)
    recruits: Recruit[];

    @OneToMany(() => UserRecruit, (userRecruit) => userRecruit.user)
    userRecruits: Recruit[];

    static of(userId: string, password: string, pace: number, hCode: string) {
        const user = new User();
        user.userId = userId;
        user.password = password;
        user.pace = pace;
        user.hCode = hCode;
        return user;
    }
}
