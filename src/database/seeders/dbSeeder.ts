import { AuthorSeeder } from "./AuthorSeeder";
import { BookSeeder } from "./BookSeeder";
import { LoanSeeder } from "./LoanSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";

(async () => {
   console.log("Starting seeders...");

   await new RoleSeeder().start();
   await new AuthorSeeder().start();
   await new BookSeeder().start();
   await new UserSeeder().start();
   await new LoanSeeder().start();
})();
