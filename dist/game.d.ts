export type GuessAccuracy = {
  bulls: number;
  cows: number;
};
export declare function generateSecret(
  length: number,
  base: number,
  random?: number,
): Array<string>;
export declare function evaluateGuess(
  secret: Array<string>,
  guess: Array<string>,
): GuessAccuracy;
export declare function isValidGuess(
  guess: Array<string>,
  length: number,
  base: number,
): boolean;
export declare function createDigitValidator(
  base: number,
): (value: string) => boolean;
export declare function countPossibleSecrets(
  length: number,
  base: number,
): number;
//# sourceMappingURL=game.d.ts.map
