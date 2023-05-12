import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";

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

function placeShipsOnLoad(boardElement) {
  // for (let i = 0; i < 4; i++) {
  //   placeShips(Ship(1), boardElement);
  // }
  for (let i = 0; i < 4; i++) {
    placeShips(Ship(2), boardElement);
  }
  for (let i = 0; i < 3; i++) {
    placeShips(Ship(3), boardElement); 
  }
  for (let i = 0; i < 2; i++) {
    placeShips(Ship(4), boardElement); 
  }
}
placeShipsOnLoad(playerGameBoard);
placeShipsOnLoad(computerGameBoard);

function checkComputerCell(event, boardElement) {
  const cell = event.target;
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');

  // Stop cell from being clicked on twice
  const cellsArray = boardElement.getBoard();
  if (cellsArray[row][col].hit) return;

  const hit = boardElement.receiveAttack(row, col);
  checkHits(cell, hit);
}
function checkPlayerCell(row, col, boardElement) {

  const cellsArray = boardElement.getBoard();
  if (cellsArray[row][col].hit) return;

  const hit = boardElement.receiveAttack(row, col);
  const cell = document.querySelector(`.playerCell[data-row='${row}'][data-col='${col}']`);

  checkHits(cell, hit);
}

function checkHits(cell, hit) {
  if(!hit) {
    cell.style.backgroundColor = 'aqua';
    cell.style.borderColor = 'aqua';
  } else {
    cell.style.backgroundColor = 'indianred';
    cell.style.borderColor = 'indianred';
  }
}

let boardActive = true;

function playerTurn() {
  if (boardActive) {
    for (const cell of computerCells) {
      const row = cell.getAttribute('data-row');
      const col = cell.getAttribute('data-col');
      const cellsArray = computerGameBoard.getBoard();
      cell.addEventListener('click', (event) => {
        checkComputerCell(event, computerGameBoard);
        if (cellsArray[row][col].ship === null) {
          computerTurn();
        }
      }, { once: true});
    }
  }
  checkWin();
}

function computerTurn() {
  if (boardActive) {
    setTimeout(() => {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      const cellsArray = playerGameBoard.getBoard();
      if (cellsArray[row][col].hit === false) {
        checkPlayerCell(row, col, playerGameBoard);
        if (cellsArray[row][col].ship !== null) {
          computerTurn();
        }
      } else {
        computerTurn();
      }
    }, 100)
  }
  checkWin();
}

function checkWin() {
  if (computerGameBoard.allShipsSunk()) {
    endGame('You win');
    boardActive = false;
  } else if (playerGameBoard.allShipsSunk()) {
    endGame('Computer wins');
    boardActive = false;
  }
}

const restartBtn = document.getElementById('restart');
const startModal = document.getElementById('start');
const startBtn = document.getElementById('startBtn');
const endModal = document.getElementById('end');
const closeBtn = document.getElementById('closeBtn');
const endMsg = document.getElementById('endMessage');

function startGame() {
  startModal.showModal();
  startBtn.addEventListener('click', () => {
    playerTurn();
    startModal.close();
  })
}

function endGame(msg) {
  endMsg.innerText = msg;
  endModal.showModal();
  closeBtn.addEventListener('click', () => {
    endModal.close();
  })
}

restartBtn.addEventListener('click', () => location.reload());

startGame();