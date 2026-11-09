import {
  generateSecret,
  evaluateGuess,
  isValidGuess,
  createDigitValidator,
  countPossibleSecrets,
} from "./game.js";
let gameSettings = { length: 3, base: 16 };
let gameHistory = [];
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
function onQuessing(quess, history, settings) {
  if (!isValidGuess(quess.split(""), settings.length, settings.base)) return;
  let clue = evaluateGuess(secret, normalizeQuess(quess));
  createEntry(quess, clue);
  addHistory(quess, history);
}
function addHistory(quess, history) {
  return [...history, quess];
}
function createEntry(quess, clue) {
  const quessInput = document.createElement("div");
  quessInput.textContent = quess + " | " + getStringClue(clue);
  gameArea.appendChild(quessInput);
}
function getStringClue(clue) {
  return "🐂 : " + clue.bulls + " 🐄 : " + clue.cows;
}
function normalizeQuess(quess) {
  return quess.toUpperCase().split("");
}
//# sourceMappingURL=script.js.map
