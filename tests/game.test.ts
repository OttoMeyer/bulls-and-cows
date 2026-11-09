import {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "../src/game";

type GuessAccuracy = {
  bulls: number;
  cows: number;
};

const seed = 0.728878561612531253;

describe("generateSecret", () => {
  test("Generate secret base 16", () => {
    expect(generateSecret(5, 16, seed)).toEqual(["1", "0", "3", "4", "5"]);
    expect(generateSecret(7, 16, seed)).toEqual([
      "1",
      "0",
      "3",
      "4",
      "5",
      "6",
      "7",
    ]);
    expect(generateSecret(3, 16, seed)).toEqual(["1", "0", "3"]);
  });
  test("Generate secret base 2", () => {
    expect(generateSecret(2, 2, seed)).toEqual(["1", "0"]);
  });
  test("Generate secret base 8", () => {
    expect(generateSecret(8, 8, seed)).toEqual([
      "1",
      "0",
      "3",
      "4",
      "5",
      "6",
      "7",
      "2",
    ]);
  });
  test("Generate secret base 10", () => {
    expect(generateSecret(4, 10, seed)).toEqual(["1", "0", "3", "4"]);
  });
  test("Does not allow length <= 0", () => {
    expect(() => generateSecret(0, 10, seed)).toThrow(RangeError);
    expect(() => generateSecret(-1, 10, seed)).toThrow(RangeError);
  });
  test("Does not allow base <= 0", () => {
    expect(() => generateSecret(4, 0, seed)).toThrow(RangeError);
    expect(() => generateSecret(4, -2, seed)).toThrow(RangeError);
  });
  test("Does not allow base > 16", () => {
    expect(() => generateSecret(4, 17, seed)).toThrow(RangeError);
    expect(() => generateSecret(4, 999, seed)).toThrow(RangeError);
  });
});

describe("evaluateGuess", () => {
  test("All bulls", () => {
    expect(evaluateGuess(["1", "2", "F"], ["1", "2", "F"])).toEqual({
      bulls: 3,
      cows: 0,
    });
  });
  test("All cows", () => {
    expect(evaluateGuess(["1", "2", "F"], ["2", "F", "1"])).toEqual({
      bulls: 0,
      cows: 3,
    });
  });
  test("All wrong", () => {
    expect(evaluateGuess(["1", "2", "F"], ["0", "E", "5"])).toEqual({
      bulls: 0,
      cows: 0,
    });
  });
  test("Bulls, cows and wrong", () => {
    expect(evaluateGuess(["1", "2", "F"], ["1", "F", "5"])).toEqual({
      bulls: 1,
      cows: 1,
    });
  });
});

describe("isValidGuess", () => {
  test("true on valid guess", () => {
    expect(isValidGuess(["1", "2", "F"], 3, 16)).toBe(true);
    expect(isValidGuess(["1", "0", "3", "4", "5"], 5, 10)).toBe(true);
  });
  test("true on upper and lower case", () => {
    expect(isValidGuess(["c", "f", "A"], 3, 16)).toBe(true);
    expect(isValidGuess(["C", "F", "a"], 3, 16)).toBe(true);
  });
  test("false on invalid length", () => {
    expect(isValidGuess(["1", "2", "F"], 2, 16)).toBe(false);
    expect(isValidGuess(["1", "0", "3", "4", "5"], 7, 10)).toBe(false);
  });
  test("false on invalid symbol", () => {
    expect(isValidGuess(["1", "2", "j"], 3, 16)).toBe(false);
    expect(isValidGuess(["1", "0", "3", "A", "5"], 5, 10)).toBe(false);
  });
  test("false on repeating symbol", () => {
    expect(isValidGuess(["1", "f", "F"], 3, 16)).toBe(false);
    expect(isValidGuess(["1", "0", "3", "4", "3"], 5, 10)).toBe(false);
  });
});

describe("createDigitValidator", () => {
  test("true on valid symbol", () => {
    expect(createDigitValidator(10)("4")).toBe(true);
    expect(createDigitValidator(4)("2")).toBe(true);
    expect(createDigitValidator(16)("a")).toBe(true);
    expect(createDigitValidator(2)("0")).toBe(true);
  });
  test("false on invalid symbol", () => {
    expect(createDigitValidator(10)("b")).toBe(false);
    expect(createDigitValidator(4)("7")).toBe(false);
    expect(createDigitValidator(16)("j")).toBe(false);
    expect(createDigitValidator(2)("2")).toBe(false);
  });
  test("true on upper and lower case", () => {
    expect(createDigitValidator(16)("a")).toBe(true);
    expect(createDigitValidator(16)("A")).toBe(true);
    expect(createDigitValidator(16)("f")).toBe(true);
    expect(createDigitValidator(16)("F")).toBe(true);
  });
});

describe("countPossibleSecrets", () => {
  test("true on valid symbol", () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(10, 10)).toBe(3628800);
    expect(countPossibleSecrets(2, 7)).toBe(42);
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(3, 16)).toBe(3360);
  });
});
