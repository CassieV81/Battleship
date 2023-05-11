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
      
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      
      rowElement.appendChild(cell);
    }
    boardElement.appendChild(rowElement);
  }
}

createBoardUI(playerBoard, playerGameBoard);
createBoardUI(computerBoard, computerGameBoard);

// create ships in different sizes
const sailBoat = Ship(1);
const ship = Ship(2);
const battleShip = Ship(3);
const aircraftCarrier = Ship(4);

const cells = document.querySelectorAll('.cells');

function clickCell(clickEvent) {
  for (const cell of cells) {
    cell.addEventListener('click', clickEvent)
  }
}

function placeRandomizedShips(ship) {
  let rand = Math.floor(Math.random() * 2);
  let orientation = (rand === 0) ? 'horizontal' : 'vertical';

  let row, col;

  if (orientation === 'horizontal') {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * (10 - (ship.shipLength - 1)));
  } else {
    row = Math.floor(Math.random() * (10 - (ship.shipLength - 1)));
    col = Math.floor(Math.random() * 10);
  }

  if (playerGameBoard.isSpaceOccupied(ship, row, col, orientation)) {
    placeRandomizedShips(ship);
  } else {
    playerGameBoard.placeShip(ship, row, col, orientation);
  }
}
placeRandomizedShips(sailBoat);
placeRandomizedShips(sailBoat);
placeRandomizedShips(sailBoat);
placeRandomizedShips(sailBoat);
placeRandomizedShips(ship);
placeRandomizedShips(ship);
placeRandomizedShips(ship);
placeRandomizedShips(battleShip);
placeRandomizedShips(battleShip);
placeRandomizedShips(aircraftCarrier);

function checkCell(event) {
  const cell = event.target;
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');
  const cellsArray = playerGameBoard.getBoard();

  if(!cellsArray[row][col].ship) {
    cell.style.backgroundColor = 'lightgrey';
  } else {
    cell.style.backgroundColor = 'indianred';
  }
}

clickCell(checkCell);
