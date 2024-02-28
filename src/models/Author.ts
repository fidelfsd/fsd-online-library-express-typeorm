import {
   BaseEntity,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity("authors")
export class Author extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "name" })
   name!: string;

   @Column({ name: "nationality" })
   nationality!: string;

   // Relation: Author {1}--{0..n} Book
   @OneToMany(() => Book, (book) => book.author)
   books?: Book[];
}
