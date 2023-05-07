import newShip from "./index";

test('newShip(5) length should be 5', () => {
  expect(newShip(5).shipLength).toBe(5);
});

test('newShip.hit() should be 3', () => {
  expect(newShip(4).hit()).toBe(3);
})