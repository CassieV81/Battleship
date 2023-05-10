import Ship from './Ship';

describe('Ship', () => {
  let testShip;
  const shipLength = 3;

  beforeEach(() => {
    testShip = Ship(shipLength);
  });

  test('creates a ship with correct length', () => {
    expect(testShip.shipLength).toBe(shipLength);
  });

  describe('hit', () => {
    test('decreases the ship length by 1 when hit', () => {
      const updatedLength = testShip.hit();
      expect(updatedLength).toBe(shipLength - 1);
    });

    test('does not decrease the ship length below 0', () => {
      for (let i = 0; i < shipLength + 1; i++) {
        testShip.hit();
      }
      const finalLength = testShip.hit();
      expect(finalLength).toBe(0);
    });
  });

  describe('isSunk', () => {
    test('returns false if the ship is not sunk', () => {
      testShip.hit();
      expect(testShip.isSunk()).toBe(false);
    });

    test('returns true if the ship is sunk', () => {
      for (let i = 0; i < shipLength; i++) {
        testShip.hit();
      }
      expect(testShip.isSunk()).toBe(true);
    });
  });
});
