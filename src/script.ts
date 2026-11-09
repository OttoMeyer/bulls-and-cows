import type { from } from "node:stream/iter";
import {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "./game";

type Settings = {
  length: number;
  base: number;
};

type GuessAccuracy = {
  bulls: number;
  cows: number;
};

let gameSettings: Settings = { length: 3, base: 16 };
let gameHistory: Array<string> = [];
let secret = generateSecret(gameSettings.length, gameSettings.base);

const gameArea = document.createElement("body");
document.body.appendChild(gameArea);

const quessInput = document.createElement("input");
quessInput.type = "text";
gameArea.appendChild(quessInput);

const submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.innerText = "quess";
submitButton.onclick = () =>
  onQuessing(quessInput.value, gameHistory, gameSettings);
gameArea.appendChild(submitButton);

function onQuessing(quess: string, history: Array<string>, settings: Settings) {
  if (!isValidGuess(quess.split(""), settings.length, settings.base)) return;
  let clue = evaluateGuess(secret, normalizeQuess(quess));
  createEntry(quess, clue);
  addHistory(quess, history);
}

function addHistory(quess: string, history: Array<string>): Array<string> {
  return [...history, quess];
}

function createEntry(quess: string, clue: GuessAccuracy) {
  const quessInput = document.createElement("div");
  quessInput.textContent = quess + " | " + getStringClue(clue);
  gameArea.appendChild(quessInput);
}

function getStringClue(clue: { bulls: number; cows: number }): string {
  return "🐂 : " + clue.bulls + " 🐄 : " + clue.cows;
}

function normalizeQuess(quess: string): Array<string> {
  return quess.toUpperCase().split("");
}
