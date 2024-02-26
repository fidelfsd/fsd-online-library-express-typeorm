import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLoansTable1708971332726 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "loans",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
               },
               {
                  name: "loan_date",
                  type: "datetime",
               },
               {
                  name: "due_date",
                  type: "datetime",
               },
               {
                  name: "return_date",
                  type: "datetime",
                  isNullable: true,
               },
               {
                  name: "user_id",
                  type: "int",
               },
               {
                  name: "book_id",
                  type: "int",
               },
            ],
            foreignKeys: [
               {
                  columnNames: ["user_id"],
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
               },
               {
                  columnNames: ["book_id"],
                  referencedTableName: "books",
                  referencedColumnNames: ["id"],
               },
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("loans");
   }
}
