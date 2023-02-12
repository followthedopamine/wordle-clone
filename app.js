import { wordList } from "./words.js";

const app = document.getElementById("app");
const container = document.createElement("div");
container.classList.add("container");
const gridElement = document.createElement("div");
container.appendChild(gridElement);
const container2 = document.createElement("div");
container2.classList.add("container");
app.appendChild(container);
app.appendChild(container2);

const grid = [
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
];

const word = wordList[~~(Math.random() * wordList.length)];

const guessedLetters = [];

let currentRow = 0;

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "<"],
];

const getKeyboardBackgrounds = () => {
  let keyboardGuessed = [
    ["u", "u", "u", "u", "u", "u", "u", "u", "u", "u"],
    ["u", "u", "u", "u", "u", "u", "u", "u", "u"],
    ["u", "u", "u", "u", "u", "u", "u", "u", "u"],
  ];
  for (const letter of guessedLetters) {
    for (let row = 0; row < keyboard.length; row++) {
      keyboardGuessed[row][keyboard[row].indexOf(letter[0])] = letter[1];
    }
  }
  return keyboardGuessed;
};

const displayKeyboard = () => {
  const keyboardElement = document.createElement("div");
  let backgrounds = getKeyboardBackgrounds();

  for (let row = 0; row < keyboard.length; row++) {
    const keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");
    for (let col = 0; col < keyboard[row].length; col++) {
      const keyboardKey = document.createElement("button");
      keyboardKey.classList.add("keyboard-key");
      keyboardKey.classList.add(backgrounds[row][col]);
      if (keyboard[row][col] === "enter") {
        keyboardKey.classList.add("enter-key");
      }
      keyboardKey.innerHTML = keyboard[row][col].toUpperCase();
      keyboardRow.appendChild(keyboardKey);
    }
    keyboardElement.appendChild(keyboardRow);
  }
  container2.appendChild(keyboardElement);
};

const updateKeyboard = () => {
  container2.innerHTML = "";
  displayKeyboard();
};

const addToGuessedLetters = (guess) => {
  // I feel like this doesn't work in some edge case
  const backgrounds = compareGuess(guess, word);
  guess = [...new Set(guess)];
  for (let i = 0; i < guess.length; i++) {
    guessedLetters.push([guess[i], backgrounds[i]]);
  }
  console.log(guessedLetters);
};

const compareGuess = (guess, word) => {
  let result = new Array(guess.length).fill("X");
  const wordArr = word.split("");
  const guessArr = [...guess];

  for (let i = 0; i < guessArr.length; i++) {
    let guessChar = guessArr[i];
    let wordChar = word.charAt(i);
    if (wordChar === guessChar) {
      result[i] = "G";
      guessArr[i] = "~";
      wordArr[i] = "`";
    }
  }
  for (let i = 0; i < guessArr.length; i++) {
    let guessChar = guessArr[i];
    if (wordArr.indexOf(guessChar) > -1) {
      result[i] = "Y";
      wordArr[wordArr.indexOf(guessChar)] = "`";
    }
  }
  return result;
};

const displayGrid = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    const backgrounds = compareGuess(grid[row], word);
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    rowElement.id = "row" + row;
    for (let col = 0; col < grid[row].length; col++) {
      const colElement = document.createElement("span");
      colElement.classList.add("letter-tile");
      if (grid[row][col] !== "~") {
        if (row < currentRow) {
          colElement.classList.add(backgrounds[col]);
        }
        colElement.innerHTML = grid[row][col].toUpperCase();
      }
      rowElement.appendChild(colElement);
    }
    gridElement.appendChild(rowElement);
  }
};

const updateGrid = (grid) => {
  gridElement.innerHTML = "";
  displayGrid(grid);
};

const inputGrid = (letter) => {
  const row = currentRow;
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "~") {
      grid[row][col] = letter;
      updateGrid(grid);
      return;
    }
  }
  return false;
};

const deleteFromGrid = () => {
  const row = currentRow;
  for (let col = 0; col < grid[row].length; col++) {
    if (grid[row][col] === "~") {
      grid[row][col - 1] = "~";
      updateGrid(grid);
      return;
    }
  }
  grid[row][grid[row].length - 1] = "~";
  updateGrid(grid);
};

const isWordInList = (guess) => {
  guess = guess.join("");
  return wordList.indexOf(guess.toLowerCase()) !== -1;
};

const isWord = (guess) => {
  guess = guess.join("");
  return guess === word;
};

const popup = (string) => {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = string;
  const replay = document.createElement("div");
  replay.classList.add("popup");
  replay.classList.add("replay");
  replay.innerHTML = "Replay";
  replay.addEventListener("click", handleReplay);
  popupContainer.appendChild(popup);
  popupContainer.appendChild(replay);
  container.appendChild(popupContainer);
};

const handleReplay = (event) => {
  document.location.reload();
};

const submitWord = () => {
  const guess = grid[currentRow];
  const messages = [
    "Epic!",
    "Impressive",
    "Nice",
    "Good job",
    "Close one",
    "Phew!",
    ":( the word was: " + word,
  ];
  if (isWordInList(guess)) {
    addToGuessedLetters(guess);
    updateKeyboard();
    if (isWord(guess)) {
      popup(messages[currentRow]);
    } else {
      if (currentRow === grid.length - 1) {
        popup(messages[currentRow + 1]);
      }
    }
    currentRow++;
    updateGrid(grid);
  } else {
    console.log("Word not in word list");
    const row = document.getElementById("row" + currentRow);
    const squares = row.children;
    for (const square of squares) {
      square.style.borderColor = "#ad2a2a";
    }
    setTimeout(() => {
      updateGrid(grid);
    }, 100);
  }
};

const keyboardHandler = (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    submitWord();
    return;
  }
  if (event.keyCode === 8) {
    event.preventDefault();
    deleteFromGrid();
    return;
  }
  if (event.keyCode >= 57 && event.keyCode <= 90) inputGrid(event.key);
};

const clickHandler = (event) => {
  if (event.target.classList.contains("keyboard-key")) {
    const key = event.target.innerHTML;
    console.log(key);
    if (key === "ENTER") {
      submitWord();
      updateGrid(grid);
      return;
    }
    if (key === "&lt;") {
      deleteFromGrid();
      return;
    }
    inputGrid(key);
  }
};

document.body.addEventListener("keydown", keyboardHandler);
container2.addEventListener("click", clickHandler);
updateGrid(grid);
displayKeyboard();
