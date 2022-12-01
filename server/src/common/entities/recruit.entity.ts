import { User } from "./user.entity";
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { Course } from "../entities/course.entity";
import { UserRecruit } from "../entities/user_recruit.entity";

@Entity("recruit")
export class Recruit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 512 })
    title: string;

    @Column({ type: "timestamp" })
    startTime: Date;

    @Column()
    maxPpl: number;

    @Column()
    pace: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserRecruit, (userRecruit) => userRecruit.recruit)
    userRecruits: UserRecruit[];

    @Column()
    courseId: number;

    @ManyToOne(() => Course, (course) => course.recruits, { nullable: false })
    @JoinColumn({ name: "courseId", referencedColumnName: "id" })
    course: Course;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.recruits, { nullable: false })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    static of(title: string, startTime: Date, maxPpl: number, pace: number, userId: number, courseId: number) {
        const recruit = new Recruit();
        recruit.title = title;
        recruit.startTime = startTime;
        recruit.maxPpl = maxPpl;
        recruit.pace = pace;
        recruit.userId = userId;
        recruit.courseId = courseId;
        return recruit;
    }
}
