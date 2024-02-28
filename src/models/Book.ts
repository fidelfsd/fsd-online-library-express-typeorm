import {
   BaseEntity,
   Column,
   Entity,
   JoinColumn,
   ManyToMany,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm";
import { Author } from "./Author";
import { User } from "./User";
import { Loan } from "./Loan";

@Entity("books")
export class Book extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ name: "title" })
   title!: string;

   @Column({ name: "gender" })
   gender!: string;

   // Relation: Book {0..n}--{1} Author
   @ManyToOne(() => Author, (author) => author.books)
   @JoinColumn({ name: "author_id" })
   author!: Author;

   // Relation: Book {0..n}--{0..n} User
   @ManyToMany(() => User, (user) => user.favoriteBooks)
   users?: User[];

   // Relation: Book {1}--{0..n} Loan
   @OneToMany(() => Loan, (loan) => loan.book)
   loans?: Loan[];
}
