const board = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6], 
];

function checkWinner() {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    statusText.textContent = "It's a Draw! ";
    gameActive = false;
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  board.forEach((cell) => (cell.textContent = ""));
}

board.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
