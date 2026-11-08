function notImplemented() {
  throw new Error("The method is not implemented.");
}

function generateSecret(
  length: number,
  base: number,
  random = Math.random,
): Array<string> | void {
  return notImplemented();
}

function evaluateGuess(secret: Array<string>, guess: Array<string>) {
  return notImplemented();
}

function isValidGuess(
  guess: Array<string>,
  length: number,
  base: number,
): boolean | void {
  return notImplemented();
}

function createDigitValidator(base: number) {
  return notImplemented();
}

function countPossibleSecrets(length: number, base: number): number | void {
  return notImplemented();
}

module.exports = {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
};
