import Gameboard from './gameboard';
import Ship from './ship';

test('placeShip horizontal', () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip(ship, 2, 2, "horizontal");

  const board = gameboard.getBoard();
  expect(board[2][2].ship).toBe(ship);
  expect(board[2][3].ship).toBe(ship);
  expect(board[2][4].ship).toBe(ship);
});

test('placeShip vertical', () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, 1, 1, "vertical");

  const board = gameboard.getBoard();
  expect(board[1][1].ship).toBe(ship);
  expect(board[2][1].ship).toBe(ship);
  expect(board[3][1].ship).toBe(ship);
  expect(board[4][1].ship).toBe(ship);
});

// index.test.js
test('Gameboard receiveAttack and ship hit', () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip(ship, 2, 2, 'horizontal');
  
  const attackResult = gameboard.receiveAttack(2, 3);
  
  expect(attackResult).toBeTruthy();
  expect(ship.hit()).toBe(1);
});

test('Gameboard receiveAttack and miss', () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip(ship, 2, 2, 'horizontal');
  
  const attackResult = gameboard.receiveAttack(0, 0);
  
  expect(attackResult).toBeFalsy();
});

test('Gameboard allShipsSunk returns false initially', () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip(ship, 2, 2, 'horizontal');
  
  const result = gameboard.allShipsSunk();
  
  expect(result).toBeFalsy();
});

test('Gameboard allShipsSunk returns true when all ships are sunk', () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip(ship, 2, 2, 'horizontal');
  
  gameboard.receiveAttack(2, 2);
  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(2, 4);
  
  const result = gameboard.allShipsSunk();
  
  expect(result).toBeTruthy();
});

