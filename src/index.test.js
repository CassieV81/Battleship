import newShip from "./index";

test('newShip(5) length should be 5', () => {
  expect(newShip(5).shipLength).toBe(5);
});

test('newShip(4).hit() should be 3', () => {
  expect(newShip(4).hit()).toBe(3);
});

test('newShip(2).isSunk should be false', () => {
  expect(newShip(2).isSunk()).toBeFalsy();
})

test('newShip(0).isSunk should be true', () => {
  expect(newShip(0).isSunk()).toBeTruthy();
})

test('newShip(1).isSunk should be true', () => {
  const ship = newShip(1);
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
})