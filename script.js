
const gameBoard = (function() {
  let row = 3;
  let column = 3;
  let val = 0;
  const board = [];
  for (let i =0; i<row; i++) {
    board[i] = [];
      for (let j = 0; j<column;j++ ) {
        board[i].push(cell());
      }
  }
  const dropMark = (col,rows,player)=> {
    const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
    board[row][col].addMark(player);
  }
  const getBoard = ()=> board;
  
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };
  

  return { getBoard,printBoard,dropMark };

  
})()
function cell() {
  let value = '0';
  
  const addMark = (player) => {
    value = player;
  }
  const getValue = ()=> value;
  return { getValue,addMark };
  }


 function gameController(playerOneName="Player One",playerTwoName ="Player Two") {
    const players = [
      {
        name:"playerOneName",
        mark:'X'
      },
      {
        name:"playerTwoName",
        mark:'O'
      }
    ];
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = ()=> {
      activePlayer;
    }
    const printNewRound = ()=> {
      gameBoard.printBoard();
      console.log(`${getActivePlayer().name}'turn.`);
    };

    const playRound = (row,column) =>{
       console.log(`Dropping ${getActivePlayer().name}'s token into column ${column} and row ${row}...`
       );
       gameBoard.dropMark(1,1,getActivePlayer().mark);

       switchPlayerTurn();
    printNewRound();
    };
    printNewRound();
  
    return { switchPlayerTurn,playRound,getActivePlayer, printNewRound }
  }
const game = gameController();
  

