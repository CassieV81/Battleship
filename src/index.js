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

// create ships in different sizes
// const sailBoat = Ship(1);
// const ship = Ship(2);
// const battleShip = Ship(3);
// const aircraftCarrier = Ship(4);


const playerCells = document.querySelectorAll('.playerCell');
const computerCells = document.querySelectorAll('.computerCell');
const randomBtn = document.getElementById('placeShips');

function placeRandomizedShips(ship) {
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

  if (playerGameBoard.isSpaceOccupied(ship, row, col, orientation)) {
    placeRandomizedShips(ship);
  } else {
    playerGameBoard.placeShip(ship, row, col, orientation);
  }
}
// create sismilar function for computer board
function placeComputerShips(ship) {
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

  if (computerGameBoard.isSpaceOccupied(ship, row, col, orientation)) {
    placeComputerShips(ship);
  } else {
    computerGameBoard.placeShip(ship, row, col, orientation);
  }
}

// create function placing ships in random areas on player's gameboard
function randomShipBtn() {
  for (let i = 0; i < 4; i++) {
    placeRandomizedShips(Ship(1));
  }
  for (let i = 0; i < 3; i++) {
    placeRandomizedShips(Ship(2));
  }
  for (let i = 0; i < 2; i++) {
    placeRandomizedShips(Ship(3)); 
  }
  placeRandomizedShips(Ship(4)); 
}
randomBtn.addEventListener('click', randomShipBtn);

// create function placing ships in random areas on computer's gameboard
function placeComputerShipsOnLoad() {
  for (let i = 0; i < 4; i++) {
    placeComputerShips(Ship(1)); 
  }
  for (let i = 0; i < 3; i++) {
    placeComputerShips(Ship(2)); 
  }
  for (let i = 0; i < 2; i++) {
    placeComputerShips(Ship(3)); 
  }
  placeComputerShips(Ship(4)); 
}
placeComputerShipsOnLoad();

function checkPlayerCell(event) {
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
function checkComputerCell(event) {
  const cell = event.target;
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');
  const cellsArray = computerGameBoard.getBoard();

  if (!cellsArray[row][col].ship) {
    cell.style.backgroundColor = 'lightgrey';
  } else {
    cell.style.backgroundColor = 'indianred';
  }
}


for (const cell of playerCells) {
  cell.addEventListener('click', checkPlayerCell);
}

for (const cell of computerCells) {
  cell.addEventListener('click', checkComputerCell);
}
