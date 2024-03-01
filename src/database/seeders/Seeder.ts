import { dataSource } from "../data-source";

export abstract class Seeder {
   protected abstract generate(): Promise<void>;

   async start(): Promise<void> {
      try {
         await dataSource.initialize();
         await this.generate();

         const seederName = this.constructor.name;
         console.log(`${seederName} --> DONE`);
      } catch (error) {
         console.error(error);
      } finally {
         await dataSource.destroy();
      }
   }
}
