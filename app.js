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
  ["s", "c", "a", "r", "f"],
  ["s", "c", "r", "a", "p"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~"],
];

const word = "scrap";

const guess = "scarp".split("");

const guessedLetters = [];

let currentRow = 2;

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
  const backgrounds = getKeyboardBackgrounds();
  for (let row = 0; row < keyboard.length; row++) {
    const keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");
    for (let col = 0; col < keyboard[row].length; col++) {
      const keyboardKey = document.createElement("div");
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
  const backgrounds = compareGuess(guess, word);
  for (let i = 0; i < guess.length; i++) {
    guessedLetters.push([guess[i], backgrounds[i]]);
  }
  console.log(guessedLetters);
};

const compareGuess = (guess, word) => {
  let result = [];
  for (let i = 0; i < guess.length; i++) {
    let guessChar = guess[i];
    let wordChar = word[i];
    let charCorrectness = "X";
    if (word.indexOf(guessChar) > -1) {
      charCorrectness = "Y";
      if (guessChar === wordChar) {
        charCorrectness = "G";
      }
    }
    result.push(charCorrectness);
  }
  return result;
};

const displayGrid = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    const backgrounds = compareGuess(grid[row], word);
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
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

const submitWord = () => {
  addToGuessedLetters(grid[currentRow]);
  updateKeyboard();
  currentRow++;
};

const keyboardHandler = (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    submitWord();
    updateGrid(grid);
    return;
  }
  inputGrid(event.key);
};

const clickHandler = (event) => {
  if (event.target.classList.contains("keyboard-key")) {
    const key = event.target.innerHTML;
    if (key === "ENTER") {
      submitWord();
      updateGrid(grid);
      return;
    }
    inputGrid(key);
  }
};

document.body.addEventListener("keypress", keyboardHandler);
container2.addEventListener("click", clickHandler);
updateGrid(grid);
inputGrid("W");
displayKeyboard();
//console.log(compareGuess(["s", "c", "a", "r", "p"], ["s", "c", "r", "a", "f"]));
