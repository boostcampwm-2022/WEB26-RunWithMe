import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("h_dong")
export class HDong {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;
}
