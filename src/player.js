import Gameboard from "./gameboard";

const Player = (board) => {

  // let board = Gameboard();

  const humanPlayer = (row, col) => {
    let cell = board.getBoard()[row][col];
    if (!cell.hit){
      return board.receiveAttack(row, col);
    }
  }

  const computerPlay = () => {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = board.getBoard()[row][col];
    if (!cell.hit){
      return board.receiveAttack(row, col);
    }
  }

  return {
    humanPlayer,
    computerPlay
  }
}

export default Player;