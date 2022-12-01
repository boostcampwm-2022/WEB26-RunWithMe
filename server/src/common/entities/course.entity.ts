import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { HDong } from "./h_dong.entity";
import { Recruit } from "./recruit.entity";
import { LatLng } from "../types/lat-lng";

@Entity("course")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 512 })
    title: string;

    @Column({ type: "text" })
    path: string;

    @Column()
    pathLength: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => HDong, (hCode) => hCode.courses, { nullable: true })
    @JoinColumn({ name: "hCode", referencedColumnName: "code" })
    @Column({ type: "varchar", length: 10 })
    hCode: string;

    @OneToMany(() => Recruit, (recruit) => recruit.course)
    recruits: Recruit[];

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.courses, { nullable: false })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    static of(title: string, path: LatLng[], pathLength: number, hCode: string, userId: number) {
        const course = new Course();
        course.title = title;
        course.path = JSON.stringify(path);
        course.hCode = hCode;
        course.pathLength = pathLength;
        course.userId = userId;
        return course;
    }
}
