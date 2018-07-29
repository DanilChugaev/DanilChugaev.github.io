/**
 * Calculates a random number from a given interval
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number} randomNumber
 * */
export default function randomInteger (min, max) {
  let rand = min - 0.5 + (Math.random() * (max - min + 1))

  return Math.round(rand)
}
