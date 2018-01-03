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


function checkDiagonals(dropPosition) {
  while()
}
