import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray } from "../../helpers/common";
import { Book } from "../../models/Book";
import { Loan } from "../../models/Loan";
import { User } from "../../models/User";
import { LoanFactory } from "../factories/LoanFactory";
import { Seeder } from "./Seeder";

export class LoanSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { LOANS } = SeederConfig;

      const users = await User.find();
      const books = await Book.find();

      const loans = new LoanFactory().createMany(LOANS);

      loans.forEach((loan, index) => {
         loan.book = books[index]; // BOOKS >= LOANS
         loan.user = getRandomValueFromArray(users);
      });

      await Loan.save(loans);
   }
}
