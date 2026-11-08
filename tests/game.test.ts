import {
  generateSecret,
  getSymbols,
  getRandomSymbol,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "../src/game";

describe("generateSecret", () => {
  test.todo("Implement tests");
});

describe("getSymbols", () => {
  test("Get base 4 symbols", () => {
    expect(getSymbols(4)).toBe(["0", "1", "2", "3"]);
  });
  test("Get base 16 symbols", () => {
    expect(getSymbols(16)).toBe([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ]);
  });
  test("Get [] if base is <=0 number", () => {
    expect(getSymbols(0)).toBe([]);
    expect(getSymbols(-1)).toBe([]);
    expect(getSymbols(-992)).toBe([]);
  });
  test("Get [] if base is a more than 16", () => {
    expect(getSymbols(17)).toBe([]);
    expect(getSymbols(45)).toBe([]);
    expect(getSymbols(999)).toBe([]);
  });
});

describe("getRandomSymbol", () => {
  test.todo("Implement tests");
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
