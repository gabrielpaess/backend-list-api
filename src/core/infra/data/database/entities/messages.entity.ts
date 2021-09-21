import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'tb_messages' })
export class MessagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id?: number;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'details',
  })
  details: string;

  @Column({
    name: 'id_user',
  })
  idUser: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => UsersEntity, (user) => user.message)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user?: UsersEntity;

  constructor(desc: string, details: string, id: string) {
    super();
    this.description = desc;
    this.details = details;
    this.idUser = id;
  }
}
