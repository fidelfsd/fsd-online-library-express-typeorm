/**
 * Returns a random value from the given array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to extract the random value.
 * @returns {T} - The random value extracted from the array.
 */
export const getRandomValueFromArray = <T>(array: T[]): T => {
   const randomIndex = Math.floor(Math.random() * array.length);
   return array[randomIndex];
};
