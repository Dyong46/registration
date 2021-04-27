import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("test")
export class TestEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	at: Date;
}
