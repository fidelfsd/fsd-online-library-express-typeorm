import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { ADMINS, MANAGERS, CLIENTS } = SeederConfig;

      const userFactory = new UserFactory();

      // admins
      const adminUsers = userFactory.createMany(ADMINS);
      adminUsers.forEach((user) => {
         user.role = UserRoles.ADMIN;
      });

      // managers
      const managerUsers = userFactory.createMany(MANAGERS);
      managerUsers.forEach((user) => {
         user.role = UserRoles.MANAGER;
      });

      // clients
      const clientUsers = userFactory.createMany(CLIENTS);
      clientUsers.forEach((user) => {
         user.role = UserRoles.CLIENT;
      });

      // save to database
      const allUsers = [...adminUsers, ...managerUsers, ...clientUsers];
      await User.save(allUsers);
   }
}
