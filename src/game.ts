function notImplemented() {
  throw new Error("The method is not implemented.");
}

type GuessAccuracy = {
  bulls: number;
  cows: number;
};

function generateSecret(
  length: number,
  base: number,
  random = Math.random,
): Array<string> | void {
  if (length <= 0) throw new RangeError("The length must be greater than zero");
  if (base <= 0 || base > 16) throw new RangeError("Base can be only 1-16");
  // prettier-ignore
  const symbols = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ].slice(0, base);
  symbols.map(function (currentValue, currentIndex) {
    if (currentIndex >= this.length - 1) return currentValue;
    if (Math.floor(random * Math.pow(10, currentIndex + 1)) % 10 >= 5) {
      // prettier-ignore
      [this[currentIndex], this[currentIndex + 1]] = 
      [this[currentIndex + 1], this[currentIndex]];
    }
    return this[currentIndex];
  }, symbols);
  return symbols.slice(0, length);
}

function evaluateGuess(
  secret: Array<string>,
  guess: Array<string>,
): GuessAccuracy | void {
  let bulls = secret.reduce(function (total, currentValue, currentIndex) {
    if (currentValue === guess[currentIndex]) return total + 1;
    return total;
  }, 0);
  let cows = secret
    .filter((currentValue, currentIndex) => currentValue != guess[currentIndex])
    .reduce(function (total, currentValue) {
      if (guess.find((value) => value === currentValue)) return total + 1;
      return total;
    }, 0);
  return { bulls: bulls, cows: cows };
}

function isValidGuess(
  guess: Array<string>,
  length: number,
  base: number,
): boolean | void {
  if (!(guess.length === length)) return false;
  if (!guess.every(createDigitValidator(base))) return false;
  return !guess
    .map((value) => value.toUpperCase())
    .some(function (currentValue, index, array) {
      return array
        .slice(index)
        .find(
          (value, index) =>
            value.toUpperCase() === currentValue.toUpperCase() && index != 0,
        );
    });
}

function createDigitValidator(base: number) {
  // prettier-ignore
  const symbols = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ].slice(0, base);
  return function (value: string) {
    if (symbols.find((currentValue) => currentValue === value.toUpperCase()))
      return true;
    return false;
  };
}

function countPossibleSecrets(length: number, base: number): number {
  if (base <= 0) return 1;
  if (length <= 0) return 1;
  return base * countPossibleSecrets(length - 1, base - 1);
}

module.exports = {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
};
