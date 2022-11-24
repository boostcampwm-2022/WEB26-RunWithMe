import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("h_dong")
export class HDong {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;
}
