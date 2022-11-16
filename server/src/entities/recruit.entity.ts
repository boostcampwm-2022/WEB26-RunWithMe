import { User } from "src/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./course.entity";
import { UserRecruit } from "./user_recruit.entity";

@Entity()
export class Recruit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 512 })
    title: string;

    @Column({ type: "timestamp" })
    startTime: Date;

    @Column()
    maxPpl: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserRecruit, (userRecruit) => userRecruit.user)
    userRecruits: UserRecruit[];

    @ManyToOne(() => Course, (course) => course.recruits, { nullable: false })
    course: Course;

    @ManyToOne(() => User, (user) => user.recruits, { nullable: false })
    user: User;
}
