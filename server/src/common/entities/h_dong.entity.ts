import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Course } from "../entities/course.entity";

@Entity("h_dong")
export class HDong {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => Course, (course) => course.hCode)
    courses: Course[];
}
