import Gameboard from "./gameboard.js";

const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');

const createBoardUI = (boardElement) => {
  const gameBoard = Gameboard();
  const cellsArray = gameBoard.getBoard();

  for (let i = 0; i < 10; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cells');
      // Add any additional logic for the cell element here, e.g., setting attributes or event listeners
      rowElement.appendChild(cell);
    }
    boardElement.appendChild(rowElement);
  }
}

createBoardUI(playerBoard);
createBoardUI(computerBoard);