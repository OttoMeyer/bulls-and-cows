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
  test.todo("Implement tests");
});

describe("createDigitValidator", () => {
  test.todo("Implement tests");
});

describe("countPossibleSecrets", () => {
  test.todo("Implement tests");
});
