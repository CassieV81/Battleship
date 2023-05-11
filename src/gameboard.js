// import Ship from "./ship.js";

const Gameboard = () => {
  const size = 10;
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < size; i++) {
      const row = [];
      board.push(row);
      for (let j = 0; j < size; j++) {
        row.push({ ship: null, hit: false });
      }
    }
  };

  createBoard(); // Create the board once

  const isSpaceOccupied = (ship, row, col, orientation) => {
    if (orientation === 'vertical') {
      for (let i = col; i < col + ship.shipLength; i++) {
        if (board[row][i].ship !== null) {
          return true;
        }
      }
    } else if (orientation === 'horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (board[row + i][col].ship !== null) {
          return true;
        }
      }
    }
    return false;
  };
  
  const placeShip = (ship, row, col, orientation) => {
    if (isSpaceOccupied(ship, row, col, orientation)) {
      return false;
    }
  
    if (orientation === 'vertical') {
      if (col + ship.shipLength <= size) {
        for (let i = col; i < col + ship.shipLength; i++) {
          board[row][i].ship = ship;
        }
      }
    } else if (orientation === 'horizontal') {
      if (row + ship.shipLength <= size) {
        for (let i = 0; i < ship.shipLength; i++) {
          board[row + i][col].ship = ship;
        }
      }
    }
    return true;
  };
  

  const receiveAttack = (rol, col) => {
    let cell = board[rol][col];
    if (cell.hit) {
      return;
    } else {
      cell.hit = true;
      if (cell.ship) {
        return cell.ship.hit();
      }
    }
  }

  const allShipsSunk = () => {
    return board.every(row =>
      row.every(cell => !cell.ship || cell.ship.isSunk())
    );
  };

  const getBoard = () => {
    return board;
  };

  return { 
    createBoard, 
    isSpaceOccupied,
    placeShip, 
    receiveAttack,
    allShipsSunk,
    getBoard };
};

export default Gameboard;
