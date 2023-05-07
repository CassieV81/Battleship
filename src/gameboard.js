
const Gameboard = () => {

  const createBoard = () => {
    const board = [];
    const size = 10;
    for(let i = 0; i < size; i++) {
      const row = [];
      board.push(row);
      for(let j = 0; j < size; j++) {
        const col = [];
        row.push(col);
      }
    }
    board[9][9]= 'hi'
    console.log(board);
  }
  createBoard();
  
}
Gameboard();