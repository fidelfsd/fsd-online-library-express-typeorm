export abstract class Factory<T> {
   protected abstract generate(): T;

   createMany(count: number): T[] {
      return Array.from({ length: count }, this.generate);
   }
}
