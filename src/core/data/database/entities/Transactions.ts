import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserRoutes from "../../../../features/user/routes/UserRoutes";
import { User } from "./User";

@Entity({ name: "transactions" })
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "value" })
  value: number;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "id_owner" })
  idOwner: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "id_owner", referencedColumnName: "id" })
  user?: UserRoutes;

  constructor(
    title: string,
    value: number,
    description: string,
    idOwner: number
  ) {
    super();
    this.title = title;
    this.value = value;
    this.description = description;
    this.idOwner = idOwner;
  }
}
