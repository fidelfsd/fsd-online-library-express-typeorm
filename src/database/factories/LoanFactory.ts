import { Loan } from "../../models/Loan";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class LoanFactory extends Factory<Loan> {
   protected generate(): Loan {
      return {
         loanDate: faker.date.past(),
         dueDate: faker.date.future(),
      } as Loan;
   }
}
