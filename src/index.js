import Gameboard from "./gameboard.js";

const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');

const gameBoard = Gameboard();
const cellsArray = gameBoard.getBoard();

const createBoardUI = (boardElement) => {

  for (let i = 0; i < cellsArray.length; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (let j = 0; j < cellsArray[i].length; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cells');
      
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      
      rowElement.appendChild(cell);
    }
    boardElement.appendChild(rowElement);
  }
}
console.log(gameBoard);
console.log(cellsArray);

createBoardUI(playerBoard);
createBoardUI(computerBoard);

const cells = document.querySelectorAll('.cells');

function clickCell(clickEvent) {
  for (const cell of cells) {
    cell.addEventListener('click', clickEvent)
  }
}

function checkCell(event) {
  const cell = event.target;
  if(!cell.ship) {
    cell.style.backgroundColor = 'lightgrey';
  }
}
const selectCell = (event) => {
  const cell = event.target;
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');

  const placeShips = gameBoard.placeShip()
  
}


clickCell(checkCell);
