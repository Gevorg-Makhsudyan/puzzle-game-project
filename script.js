const container = document.querySelector("#container");
const boardSize = 4;
let cells = []

let randomNumbers = [];
for (let index = 0; index < boardSize ** 2; index++) {
  randomNumbers.push(index === boardSize ** 2 - 1 ? null : index + 1);
}
randomNumbers.sort(() => Math.random() - 0.5);

for (let i = randomNumbers.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [randomNumbers[i], randomNumbers[j]] = [randomNumbers[j], randomNumbers[i]];
}

for (let i = 0; i < boardSize; i++) {
  const row = document.createElement("div");
  row.classList.add("row");

  let rowCells = [];

  for (let j = 0; j < boardSize; j++) {
    const cell = document.createElement("div");
    const value = randomNumbers[i * boardSize + j];

    cell.classList.add("cell");

    if (value !== null) {
      cell.innerText = value;
      cell.addEventListener("click", () => moveBoxes(i, j));
    } else {
      cell.classList.add("empty");
    }

    row.appendChild(cell);
    rowCells.push(cell);
  }

  cells.push(rowCells);
  container.appendChild(row);
}

console.log(randomNumbers);

function findEmptyCell() {
  const emptyIndex = randomNumbers.indexOf(null);
  console.log(`Empty cell found at index ${emptyIndex}`);
  return {
    row: Math.floor(emptyIndex / boardSize),
    col: emptyIndex % boardSize,
    index: emptyIndex,
  };
}

function checkWinner() {
  const correctOrder = [];
  for (let i = 1; i < boardSize ** 2; i++) {
    correctOrder.push(i);
  }
  correctOrder.push(null); 

  if (JSON.stringify(randomNumbers) === JSON.stringify(correctOrder)) {
    setTimeout(() => alert("You won!"), 100);
  }
}

function moveBoxes(i, j) {
  console.log(`Clicked cell: (${i}, ${j})`);

  const { row: emptyRow, col: emptyCol, index: emptyIndex } = findEmptyCell();
  console.log(`Empty cell: (${emptyRow}, ${emptyCol})`);

  const isAdjacent =
    (Math.abs(i - emptyRow) === 1 && j === emptyCol) ||
    (Math.abs(j - emptyCol) === 1 && i === emptyRow);

  if (isAdjacent) {
    const clickedIndex = i * boardSize + j;

    [randomNumbers[clickedIndex], randomNumbers[emptyIndex]] = [
      randomNumbers[emptyIndex],
      randomNumbers[clickedIndex],
    ];

    console.log("Updated array:", randomNumbers);

    const clickedCell = cells[i][j];
    const emptyCell = cells[emptyRow][emptyCol];

    emptyCell.innerText = clickedCell.innerText;
    emptyCell.classList.remove("empty");

    emptyCell.onclick = () => moveBoxes(emptyRow, emptyCol);

    clickedCell.innerText = "";
    clickedCell.classList.add("empty");

    clickedCell.onclick = null;

    cells[emptyRow][emptyCol] = emptyCell;
    cells[i][j] = clickedCell;

    checkWinner();
  }
}

// function getHint ()



// function clickHandler(i, j) {
//   const topIndex = i > 0 ? (i - 1) * boardSize + j : null
//   const rightIndex = j < boardSize - 1 ? i * boardSize + j + 1 : null
//   const bottomIndex = i < boardSize - 1 ? (i + 1) * boardSize + j : null
//   const leftIndex = j > 0 ? i * boardSize + j - 1 : null

//   console.log(
//     "Click",
//     topIndex !== null ? randomNumbers[topIndex] : "Undefined",
//     rightIndex !== null ? randomNumbers[rightIndex] : "Undefined",
//     bottomIndex !== null ? randomNumbers[bottomIndex] : "Undefined",
//     leftIndex !== null ? randomNumbers[leftIndex] : "Undefined"
//   );
// }

