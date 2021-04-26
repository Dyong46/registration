import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("test")
export default class Test extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	at: Date;
}
