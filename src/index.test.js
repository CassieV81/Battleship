import newShip from "./index";

test('newShip(5) length should be 5', () => {
  expect(newShip(5).length).toBe(5);
})