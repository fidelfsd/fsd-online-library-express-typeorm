import { SeederConfig } from "../../config/seeders";
import { Author } from "../../models/Author";
import { AuthorFactory } from "../factories/AuthorFactory";
import { Seeder } from "./Seeder";

export class AuthorSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { AUTHORS } = SeederConfig;

      const authors = new AuthorFactory().createMany(AUTHORS);
      await Author.save(authors);
   }
}
