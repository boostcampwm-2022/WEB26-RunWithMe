import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "./course.entity";
import { User } from "./user.entity";

@Entity("h_dong")
export class HDong {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => Course, (course) => course.hCode)
    courses: Course[];

    @OneToMany(() => User, (user) => user.hCode)
    users: User[];
}
