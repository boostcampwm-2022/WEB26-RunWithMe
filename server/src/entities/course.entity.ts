import { User } from "src/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recruit } from "./recruit.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 512 })
    title: string;

    @Column({ type: "varchar", length: 512 })
    img: string;

    @Column({ type: "json" })
    path: string;

    @Column()
    pathLength: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Recruit, (recruit) => recruit.course)
    recruits: Recruit[];

    @ManyToOne(() => User, (user) => user.courses, { nullable: false })
    user: User;
}
