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

createSetting();

function createSetting() {
  const settingsArea = document.createElement("div");
  settingsArea.id = "settingsArea";
  gameArea.appendChild(settingsArea);

  const lengthLable = document.createElement("lable");
  lengthLable.textContent = "length:";
  settingsArea.appendChild(lengthLable);

  const lengthInput = document.createElement("input");
  lengthInput.type = "number";
  lengthInput.value = "1";
  lengthInput.min = "1";
  lengthInput.max = "20";
  lengthInput.step = "1";
  lengthInput.id = "lengthInput";
  settingsArea.appendChild(lengthInput);

  const baseLable = document.createElement("lable");
  baseLable.textContent = "base:";
  settingsArea.appendChild(baseLable);

  const baseInput = document.createElement("input");
  baseInput.type = "number";
  baseInput.value = "1";
  baseInput.min = "2";
  baseInput.max = "16";
  baseInput.step = "1";
  baseInput.id = "baseInput";
  settingsArea.appendChild(baseInput);

  const startButton = document.createElement("button");
  startButton.textContent = "start";
  startButton.onclick = onStart;
  settingsArea.appendChild(startButton);

  const errorLable = document.createElement("p");
  errorLable.textContent = "";
  errorLable.id = "errorLable";
  settingsArea.appendChild(errorLable);
}

function createGame() {
  const settingsLable = document.createElement("p");
  settingsLable.textContent =
    "length:" + gameSettings.length + " | base:" + gameSettings.base;
  settingsLable.id = "settingsLable";
  gameArea.appendChild(settingsLable);

  const quessInput = document.createElement("input");
  quessInput.type = "text";
  gameArea.appendChild(quessInput);

  const errorLable = document.createElement("p");
  errorLable.textContent = "";
  errorLable.id = "errorLable";
  gameArea.appendChild(errorLable);

  const submitButton = document.createElement("button");
  submitButton.textContent = "quess";
  submitButton.onclick = () =>
    onQuessing(quessInput.value, gameHistory, gameSettings);
  gameArea.appendChild(submitButton);
}

function onStart() {
  setSettings();
  if (checkSettings()) return;
  document.getElementById("settingsArea")?.remove();
  createGame();
}

function setSettings() {
  const lengthInput = document.getElementById(
    "lengthInput",
  ) as HTMLInputElement;
  const baseInput = document.getElementById("baseInput") as HTMLInputElement;
  gameSettings.length = +lengthInput?.value;
  gameSettings.base = +baseInput?.value;
}

function checkSettings() {
  const errorLable = document.getElementById("errorLable");
  if (gameSettings.length > gameSettings.base) {
    errorLable!.textContent = "Length must be less than or equal to base";
    return true;
  }
  if (gameSettings.length <= 0) {
    errorLable!.textContent = "Length must be more then 0";
    return true;
  }
  if (!(gameSettings.base > 1 && gameSettings.base <= 16)) {
    errorLable!.textContent = "Base must be in range 2-16";
    return true;
  }
  return false;
}

function onQuessing(quess: string, history: Array<string>, settings: Settings) {
  const errorLable = document.getElementById("errorLable");
  if (!isValidGuess(quess.split(""), settings.length, settings.base)) {
    errorLable!.textContent = "Invalid guess";
    return;
  }
  errorLable!.textContent = "";
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
