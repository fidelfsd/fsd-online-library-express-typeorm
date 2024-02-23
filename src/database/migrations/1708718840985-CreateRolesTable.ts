import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRolesTable1708718840985 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "roles",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "name",
                  type: "varchar",
                  length: "40",
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("roles");
   }
}
