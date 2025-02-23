/*
** The Gameboard represents the state of the board
** Each equare holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to squares
*/

const gameBoard = (function(){
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create a 2d array that will represent the state of the game board
  // For this 2d array, row 0 will represent the top row and
  // column 0 will represent the left-most column.
  // This nested-loop technique is a simple and common way to create a 2d array.
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  
  const getBoard = () => board;

  const dropToken = (row,column, player) => {
    if(checkEmptyCell(row,column)) {
      board[row][column].addToken(player);
    }
 
  
};  
const checkEmptyCell = (row,column)=> {
  if(board[row][column].getValue()!==0) {
   
    return false;
}
return true;
};
  
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };


  // Here, we provide an interface for the rest of our
  // application to interact with the board
  return { checkEmptyCell,getBoard, dropToken, printBoard };
})()



function Cell() {
  let value = 0;

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}

/* 
** The GameController will be responsible for controlling the 
** flow and state of the game's turns, as well as whether
** anybody has won the game
*/
const gameController = (function(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  

  const players = [
    {
      name: playerOneName,
      token: 'X'
    },
    {
      name: playerTwoName,
      token: 'O'
    }
  ];
 
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
   
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameBoard.printBoard();
  
   
  };

  const playRound = (row,column) => {
  
    // Drop a token for the current player
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column} row ${row}...`
    );
    if(gameBoard.checkEmptyCell(row,column)){
      gameBoard.dropToken(row,column,getActivePlayer().token);
      switchPlayerTurn();
    }
    
  };

  // Initial play game message
  

  // For the console version, we will only use playRound, but we will need
  // getActivePlayer for the UI version, so I'm revealing it now
  return {
    playRound,
    getActivePlayer,
    switchPlayerTurn,
    printNewRound
  };
})();


gameController.playRound(1,1);
gameController.printNewRound();
gameController.playRound(1,1);
gameController.playRound(1,1);
gameController.playRound(0,1);
gameController.playRound(1,2);
gameController.playRound(0,0);
gameController.playRound(1,0);
gameController.printNewRound();



