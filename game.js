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
    playerTokenArr.push({
      'playerNumber': i,
      'name': 'User' + i,
      'tokenColor': '',
    });
  }
  return playerTokenArr;
}

function cyclePlayers(playerTokenArr) {
  playerTokenArr.push(playerTokenArr.shift());
}

console.log(playerTokenArr);
cyclePlayers(playerTokenArr);
console.log(playerTokenArr);

function checkNEDiagonals(dropPosition) { //dropPosition = array [col#, height]
  var cursorVal = gameBoardArr[dropPosition[0]][dropPosition[1]];
  var counter = 0;
  while( cursorVal === gameBoardArr[dropPosition[0]+1][dropPosition[1]+1]) { // while top right corner is the same token move to top right corner;
    dropPosition[0]++; dropPosition[1]++;
    if(dropPosition[0] === gameBoardArr[0].length || dropPosition[1] === gameBoardArr[0].length) {
      break;
    }
  }
  while(cursorVal === gameBoardArr[dropPosition[0]-1][dropPosition[1]-1]) {
    dropPosition[0]--; dropPosition[1]--;
    counter++;
    if(dropPosition[0] === 0 || dropPosition[1] === 0) {
      break;
    }
  }
  if (counter >= 3) {
    console.log('win');
    // return playerWin(playerArr[0]);
  }
}

function checkSWDiagonals(dropPosition) { //dropPosition = array [col#, height]
  var cursorVal = gameBoardArr[dropPosition[0]][dropPosition[1]];
  var counter = 0;
  //SW -> NE diag check
  while( cursorVal === gameBoardArr[dropPosition[0]-1][dropPosition[1]+1]) {
    dropPosition[0]--; dropPosition[1]++;
    if(dropPosition[0] === 0 || dropPosition[1] === 0) {
      break;
    }
  }
  while(cursorVal === gameBoardArr[dropPosition[0]+1][dropPosition[1]-1]) {
    dropPosition[0]++; dropPosition[1]--;
    counter++;
    if(dropPosition[0] === 0 || dropPosition[1] === 0) {
      break;
    }
  }
  if (counter > 3) {
    console.log('win');
    // return playerWin(playerArr[0]);
  }
}
