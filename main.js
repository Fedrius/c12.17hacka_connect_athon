//check drop position and store token functions

var gameboardArr = null;
var droppedPosition = [];

//function uses a regex g modifer to do a global match between 0 and 9. in this case would be find the column id number.
//colIndex is the selected column index
//last index of x is the most bottom position in the column

function checkDropPosition(id){
    var colIndex = parseInt(/[0-9]/g.match[id].join(''));
    dropPosition.push(colIndex, gameboardArr[colIndex].lastIndexOf('x'));
}

//need to declare current player token..
//gameboardArr[column][row position]

function storeToken(DropPosArray){
    gameboardArr[DropPosArray[0]][DropPosArray[1]] = playerArr[0].tokenColor;
    updateDisplay();
}

//colIndex is going to be dropped position at index 0
function checkVerticalWin(colIndex){
    var theTokenColumn = gameboardArr[colIndex];

    var match = 0;
    for(var columnIndex = 0; columnIndex < theTokenColumn.length - 1; columnIndex++){
        if(theTokenColumn[columnIndex] === theTokenColumn[columnIndex + 1]){
            match++;
            if(match >= 3){
                console.log('winnnner');//player wins
                break;
            }
        } else {
            match = 0;
        }
    }
}

//rowPosIndex is going to be droppedposition at index 1
function checkHorizontalWin(rowPosIndex){

    var match = 0;
    for (var columnIndex = 0; columnIndex < gameboardArr.length - 1; columnIndex++) {
        if (gameboardArr[columnIndex][rowPosIndex] === gameboardArr[columnIndex + 1][rowPosIndex]) {
            match++;
            if (match >= 3) {
                console.log('winnnner');//player wins
                break;
            }
        } else {
            match = 0;
        }
    }
}

function checkDrawGame(){

}