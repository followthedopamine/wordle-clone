const app = document.getElementById("app");
const container = document.createElement("div");
container.classList.add("container");
app.appendChild(container);

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
        colElement.classList.add(backgrounds[col]);
        colElement.innerHTML = grid[row][col].toUpperCase();
      }
      rowElement.appendChild(colElement);
    }
    container.appendChild(rowElement);
  }
};

displayGrid(grid);
//console.log(compareGuess(["s", "c", "a", "r", "p"], ["s", "c", "r", "a", "f"]));
