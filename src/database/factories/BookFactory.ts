import { Book } from "../../models/Book";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class BookFactory extends Factory<Book> {
   protected generate(): Book {
      return {
         title: faker.lorem.sentence({ min: 1, max: 6 }),
         gender: faker.helpers.arrayElement([
            "Contemporary Fiction",
            "Mystery",
            "Science Fiction",
            "Fantasy",
            "Romance",
            "Horror",
            "Poetry",
            "Non-fiction",
            "History",
            "Biography",
         ]),
      } as Book;
   }
}
