import {
   BaseEntity,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "name" })
   name!: string;

   // Relation: Role {1}--{0..n} User
   @OneToMany(() => User, (user) => user.role)
   users?: User[];
}
