import { LatLng } from "src/common/type/lat-lng";
import { User } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recruit } from "./recruit.entity";

@Entity("course")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 512 })
    title: string;

    @Column({ type: "varchar", length: 512 })
    img: string;

    @Column({ type: "text" })
    path: string;

    @Column()
    pathLength: number;

    @Column({ type: "varchar", length: 10, nullable: true })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: "varchar", length: 10 })
    hCode: string;

    @OneToMany(() => Recruit, (recruit) => recruit.course)
    recruits: Recruit[];

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.courses, { nullable: false })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user: User;

    static of(
        title: string,
        img: string,
        path: LatLng[],
        pathLength: number,
        hCode: string,
        userId: number,
        name: string,
    ) {
        const course = new Course();
        course.title = title;
        course.img = img;
        course.path = JSON.stringify(path);
        course.hCode = hCode;
        course.pathLength = pathLength;
        course.userId = userId;
        course.name = name;
        return course;
    }
}
