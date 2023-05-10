import Player from "./player";
import Gameboard from "./gameboard";

describe("Player", () => {
  let player;
  let board;

  beforeEach(() => {
    board = Gameboard();
    player = Player(board);
  });

  test("humanPlayer calls receiveAttack with correct row and column", () => {
    const mockReceiveAttack = jest.spyOn(board, "receiveAttack");
    player.humanPlayer(3, 4);
    expect(mockReceiveAttack).toHaveBeenCalledWith(3, 4);
  });

  test("computerPlay calls receiveAttack with a valid row and column", () => {
    const mockReceiveAttack = jest.spyOn(board, "receiveAttack");
    player.computerPlay();
    expect(mockReceiveAttack).toHaveBeenCalled();
  });
});
