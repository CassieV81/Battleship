import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');

const playerGameBoard = Gameboard();
const computerGameBoard = Gameboard();

const createBoardUI = (boardElement, gameBoardInstance) => {
  const cellsArray = gameBoardInstance.getBoard();

  for (let i = 0; i < cellsArray.length; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (let j = 0; j < cellsArray[i].length; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cells');
      
      boardElement.id === 'playerBoard' ? cell.classList.add('playerCell') : cell.classList.add('computerCell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      
      rowElement.appendChild(cell);
    }
    boardElement.appendChild(rowElement);
  }
}

createBoardUI(playerBoard, playerGameBoard);
createBoardUI(computerBoard, computerGameBoard);

const playerCells = document.querySelectorAll('.playerCell');
const computerCells = document.querySelectorAll('.computerCell');


// create function placing ships in random areas on gameboard

function placeShips(ship, boardElement) {
  let rand = Math.floor(Math.random() * 2);
  let orientation = (rand === 0) ? 'horizontal' : 'vertical';
  let row, col;

  if (orientation === 'horizontal') {
    row = Math.floor(Math.random() * (10 - (ship.shipLength - 1)));
    col = Math.floor(Math.random() * 10);
  } else {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * (10 - (ship.shipLength - 1)));
  }

  if (boardElement.isSpaceOccupied(ship, row, col, orientation)) {
    placeShips(ship, boardElement);
  } else {
    boardElement.placeShip(ship, row, col, orientation);
  }
}

function placePlayerShipsonLoad(boardElement) {
  for (let i = 0; i < 4; i++) {
    placeShips(Ship(1), boardElement);
  }
  for (let i = 0; i < 3; i++) {
    placeShips(Ship(2), boardElement);
  }
  for (let i = 0; i < 2; i++) {
    placeShips(Ship(3), boardElement); 
  }
  placeShips(Ship(4), boardElement); 
}
placePlayerShipsonLoad(playerGameBoard);
placePlayerShipsonLoad(computerGameBoard);

function checkCell(event, boardElement) {
  const cell = event.target;
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');
  const cellsArray = boardElement.getBoard();

  if(!cellsArray[row][col].ship) {
    cell.style.backgroundColor = 'aqua';
    cell.style.borderColor = 'aqua';
  } else {
    cell.style.backgroundColor = 'indianred';
    cell.style.borderColor = 'indianred';
  }
}
// console.log(playerCells);
for (const cell of playerCells) {
  cell.addEventListener('click', (event) => checkCell(event, playerGameBoard));
}
for (const cell of computerCells) {
  cell.addEventListener('click', (event) => checkCell(event, computerGameBoard));
}