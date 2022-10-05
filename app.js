const app = document.getElementById("app");
const container = document.createElement("div");
container.classList.add("container");
app.appendChild(container);

const grid = [
  [["s"], ["c"], ["a"], ["r"], ["p"]],
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []],
];

const word = "scrap";

const guess = "scarp";

const compareGuess = (guess, word) => {};

const displayGrid = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    for (let col = 0; col < grid[row].length; col++) {
      const colElement = document.createElement("span");
      colElement.classList.add("letter-tile");
      colElement.innerHTML = grid[row][col].toString().toUpperCase();
      rowElement.appendChild(colElement);
    }
    container.appendChild(rowElement);
  }
};

displayGrid(grid);
