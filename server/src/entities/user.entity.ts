import { Course } from "src/entities/course.entity";
import { Recruit } from "src/entities/recruit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRecruit } from "./user_recruit.entity";

@Entity()
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
    zipCode: string;

    @OneToMany(() => Course, (course) => course.user)
    courses: Course[];

    @OneToMany(() => Recruit, (recruit) => recruit.user)
    recruits: Recruit[];

    @OneToMany(() => UserRecruit, (userRecruit) => userRecruit.recruit)
    userRecruits: Recruit[];

    static from(userId: string, password: string, pace: number, zipCode: string) {
        const user = new User();
        user.userId = userId;
        user.password = password;
        user.pace = pace;
        user.zipCode = zipCode;
        return user;
    }
}
