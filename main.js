//check drop position and store token functions

var gameboardArr = null;
var dropPosition = [];

//function uses a regex g modifer to do a global match between 0 and 9. in this case would be find the column id number.
//colIndex is the selected column index
//last index of x is the most bottom position in the column

function checkDropPosition(id){
    var colIndex = parseInt(/[0-9]/g.match[id]);
    dropPosition.push(colIndex, gameboardArr[colIndex].lastIndexOf('x'));
}

//need to declare current player token..
//gameboardArr[column, position]

function storeToken(posArray){
    currentPlayerToken = gameboardArr[posArray[0]][posArray[1]];
    updateDisplay();
}

