import { Author } from "../../models/Author";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class AuthorFactory extends Factory<Author> {
   protected generate(): Author {
      return {
         name: faker.person.fullName(),
         nationality: faker.location.country(),
      } as Author;
   }
}
