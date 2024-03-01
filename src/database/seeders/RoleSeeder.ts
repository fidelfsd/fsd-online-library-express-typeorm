import { UserRoles } from "../../constants/UserRoles";
import { Role } from "../../models/Role";
import { Seeder } from "./Seeder";

export class RoleSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const roles: Partial<Role>[] = [
         UserRoles.ADMIN,
         UserRoles.MANAGER,
         UserRoles.CLIENT,
      ];

      await Role.save(roles);
   }
}
