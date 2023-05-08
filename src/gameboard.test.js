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
