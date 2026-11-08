import {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "../src/game";

describe("generateSecret", () => {
  test("Generate secret base 16", () => {
    expect(generateSecret(5, 16, 0.123456)).toEqual(["1", "E", "2", "4", "0"]);
  });
  test("Adds 0 at the end if there are not enough simbolos", () => {
    expect(generateSecret(7, 16, 0.123456)).toEqual([
      "1",
      "E",
      "2",
      "4",
      "0",
      "0",
      "0",
    ]);
  });
  test("Cut simbolos at the end if there are too many simbolos", () => {
    expect(generateSecret(3, 16, 0.123456)).toEqual(["1", "E", "2"]);
  });
  test("Generate secret base 2", () => {
    expect(generateSecret(8, 2, 0.123456)).toEqual([
      "0",
      "0",
      "0",
      "1",
      "1",
      "1",
      "1",
      "0",
    ]);
  });
  test("Generate secret base 8", () => {
    expect(generateSecret(8, 8, 0.123456)).toEqual([
      "3",
      "6",
      "1",
      "1",
      "0",
      "0",
      "0",
      "0",
    ]);
  });
  test("Generate secret base 10", () => {
    expect(generateSecret(4, 10, 0.123456)).toEqual(["1", "2", "3", "4"]);
  });
  test("Does not allow length <= 0", () => {
    expect(() => generateSecret(0, 10, 0.123456)).toThrow(RangeError);
    expect(() => generateSecret(-1, 10, 0.123456)).toThrow(RangeError);
  });
  test("Does not allow base <= 0", () => {
    expect(() => generateSecret(4, 0, 0.123456)).toThrow(RangeError);
    expect(() => generateSecret(4, -2, 0.123456)).toThrow(RangeError);
  });
  test("Does not allow base > 16", () => {
    expect(() => generateSecret(4, 17, 0.123456)).toThrow(RangeError);
    expect(() => generateSecret(4, 999, 0.123456)).toThrow(RangeError);
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
