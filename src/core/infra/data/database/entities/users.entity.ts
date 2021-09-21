import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessagesEntity } from "./messages.entity";

@Entity({ name: 'tb_users' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int'
  })
  id?: number;

  @Column({
    name: 'name'
  })
  name: string;

  @Column({
    name: 'password'
  })
  password: string;

  @Column({
    name: 'repeat_password'
  })
  repeat_password: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => MessagesEntity, (msg) => msg.user)
  message?: MessagesEntity[];

  constructor(name: string, pass: string, repeat: string) {
    super();
    this.name = name;
    this.password = pass;
    this.repeat_password = repeat;
  }
}
