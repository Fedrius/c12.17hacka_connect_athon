function createArrGameBoard(rows = 6, cols = 7) {
  var gameBoardArr = [];
  for(var i=1;i<=cols;i++) {
    var colArr = new Array(rows); // column height === # of rows
    colArr.fill('X'); //'X' is placeholder for empty title
    gameBoardArr.push(colArr);
  }
  return gameBoardArr;
}
console.log(createArrGameBoard());

//Globals :(
var playerTokenArr = makePlayerTokenArr(2); //default 2 players'
var currentPlayer = playerTokenArr[0];

function makePlayerTokenArr(num) {
  var playerTokenArr = [];
  for (var i=1;i<=num;i++) {
    playerTokenArr.push(i);
  }
  return playerTokenArr;
}

function switchPlayers(playerTokenArr) {
  playerTokenArr.push(playerTokenArr.shift());
}

console.log(playerTokenArr);
switchPlayers(playerTokenArr);
console.log(playerTokenArr);


function checkSWDiagonals(dropPosition) { //dropPosition = array [col#, height]
  var cursor = gameBoard[dropPosition[0]][dropPosition[1]];
  var counter = 0;
  //SW -> NE diag check
  while(gameBoard[dropPosition[0]-1][dropPosition[1]+1] && cursor === gameBoard[dropPosition[0]-1][dropPosition[1]+1]) {
    dropPosition[0]--; dropPosition[1]++;
    cursor = gameBoard[dropPosition[0]][dropPosition[1]];
  }
  while(cursor === gameBoard[dropPosition[0]+1][dropPosition[1]-1]) {
    dropPosition[0]++; dropPosition[0]--;
    cursor = gameBoard[dropPosition[0]][dropPosition[1]];
    counter++;
  }
  if (counter > 3) {
    return playerWin(playerArr[0]);
  }
}

function checkNEDiagonals(dropPosition) {
  var cursor = gameBoard[dropPosition[0]][dropPosition[1]];
  var counter = 0;
  while(cursor === gameBoard[dropPosition[0]+1][dropPosition[1]+1]) {
    cursor = gameBoard[dropPosition[0]+1][dropPosition[1]+1];
  }
  while(cursor === gameBoard[dropPosition[0]-1][dropPosition[1]-1]) {
    cursor = gameBoard[dropPosition[0]-1][dropPosition[1]-1];
    counter++;
  }
  if (counter > 3) {
    return playerWin(playerArr[0]);
  }
}
