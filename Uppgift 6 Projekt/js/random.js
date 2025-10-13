// returns a random integer in the inclusive range [min, max]
function getRandomInt(min, max) {
  // make sure we work with integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // if args are reversed, swap them
  if (min > max) [min, max] = [max, min];

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns an array of `count` unique integers within [min, max] (inclusive).
 * Throws if `count` is larger than the number of available values.
 */
export function getUniqueRandomIntegers(min, max, count = 1) {
  // normalize inputs to integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // allow reversed input (e.g., 10, 3)
  if (min > max) [min, max] = [max, min];

  // basic validation
  const rangeSize = max - min + 1;
  if (count < 0) count = 0; // negative count -> nothing to pick
  if (count > rangeSize) {
    throw new Error('Count must be less than or equal to the range size');
  }

  // pick unique numbers using a Set
  const unique = new Set();
  while (unique.size < count) {
    unique.add(getRandomInt(min, max));
  }

  // return as a plain array (in insertion order)
  return Array.from(unique);
}
