import {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "../src/game";

describe("generateSecret", () => {
  test("Generate secret base 16", () => {
    generateSecret(5, 16, 123456).toEqual(["1", "E", "2", "4", "0"]);
  });
  test("Adds 0 at the start if there are not enough simbolos", () => {
    generateSecret(7, 16, 123456).toEqual(["0", "0", "1", "E", "2", "4", "0"]);
  });
  test("Cut simbolos at the start if there are too many simbolos", () => {
    generateSecret(3, 16, 123456).toEqual(["2", "4", "0"]);
  });
  test("Generate secret base 2", () => {
    generateSecret(8, 2, 123456).toEqual([
      "0",
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ]);
  });
  test("Generate secret base 8", () => {
    generateSecret(8, 8, 123456).toEqual([
      "0",
      "0",
      "3",
      "6",
      "1",
      "1",
      "0",
      "0",
    ]);
  });
  test("Generate secret base 10", () => {
    generateSecret(4, 10, 123456).toEqual(["3", "4", "5", "6"]);
  });
  test("Does not allow length <= 0", () => {
    generateSecret(0, 10, 123456).toThrow(RangeError);
    generateSecret(-1, 10, 123456).toThrow(RangeError);
  });
  test("Does not allow base <= 0", () => {
    generateSecret(4, 0, 123456).toThrow(RangeError);
    generateSecret(4, -2, 123456).toThrow(RangeError);
  });
  test("Does not allow base > 16", () => {
    generateSecret(4, 17, 123456).toThrow(RangeError);
    generateSecret(4, 999, 123456).toThrow(RangeError);
  });
});

describe("evaluateGuess", () => {
  test.todo("Implement tests");
});

describe("isValidGuess", () => {
  test.todo("Implement tests");
});

describe("createDigitValidator", () => {
  test.todo("Implement tests");
});

describe("countPossibleSecrets", () => {
  test.todo("Implement tests");
});
