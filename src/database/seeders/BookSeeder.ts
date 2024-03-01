import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray } from "../../helpers/common";
import { Author } from "../../models/Author";
import { Book } from "../../models/Book";
import { BookFactory } from "../factories/BookFactory";
import { Seeder } from "./Seeder";

export class BookSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { BOOKS } = SeederConfig;

      const authors = await Author.find();

      const books = new BookFactory().createMany(BOOKS);
      books.forEach((book) => {
         book.author = getRandomValueFromArray(authors);
      });

      await Book.save(books);
   }
}
