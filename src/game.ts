function notImplemented() {
  throw new Error("The method is not implemented.");
}

function generateSecret(
  length: number,
  base: number,
  random = Math.random,
): Array<string> | void {
  if (length <= 0) throw new RangeError("The length must be greater than zero");
  if (base <= 0 || base > 16) throw new RangeError("Base can be only 1-16");
  let secretNumber: number = parseInt(random.toString().slice(2));
  let secret: string = secretNumber.toString(base).toUpperCase();
  if (secret.length < length) secret = secret.padEnd(length, "0");
  else if (secret.length > length) secret = secret.slice(0, length);
  return (secret + secret[0]).slice(1).split("");
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
