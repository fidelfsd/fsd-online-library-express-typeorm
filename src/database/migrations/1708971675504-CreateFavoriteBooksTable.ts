import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateFavoriteBooksTable1708971675504
   implements MigrationInterface
{
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "favorite_books",
            columns: [
               {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
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
            uniques: [
               new TableUnique({
                  name: "user_book_unique",
                  columnNames: ["user_id", "book_id"],
               }),
            ],
         }),
         true
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("favorite_books");
   }
}
