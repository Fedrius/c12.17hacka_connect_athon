$(document).ready(initializeApp);

function initializeApp(){
    $('.start-button').on('click', startGame);
}

function startGame(){
    $('.start-button').css('display', 'none');
    $('.player-number-container').css('display', 'flex');
    $('.player-amount').on('click', selectPlayers);
}

function selectPlayers(){
    var playerAmount;

    if($(this).attr('class').indexOf('2-users') !== -1){
        playerAmount = 2;
    }else if($(this).attr('class').indexOf('3-users') !== -1){
        playerAmount = 3;
    }else if($(this).attr('class').indexOf('4-users') !== -1){
        playerAmount = 4;
    }

    makePlayerTokenArr(playerAmount);

    $('.intro-container').css('display', 'none');
    $('.main-splash-container').css('display', 'flex');
}


function createInputFields(num){

    var lineBreak = $("<br>");

    for(var index = 1; index <= num; index++){
        var container = $("<div>").addClass('player-' + index + '-container').css({"display": "none", "flex-direction": "column"});
        var title = $("<div>").addClass('player-title').text('User ' + index);
        var nameInput = $("<input>").attr('type', 'text');
        // var submit = $("<button>").addClass('submit').text('SUBMIT').css('margin-top', '5vh');

        container.append(title, nameInput);
        $('.player-input-container').append(container);
    }

    $('.player-1-container').css('display', 'flex');

}

var gameBoardArr = createArrGameBoard();
var playerArr = makePlayerTokenArr();
var dropPosition = new Array(2);

//called when user selects amount of players
function makePlayerTokenArr(num = 2) {
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

//called when user selects amount of players
function createGameBoard(row,column) { // Function that creates game board.
    var rows = row || 6; // Declared variable takes in number of rows or defaults to six.
    var column = column || 7; // Declared variable takes in number of columns or defaults to seven.

    for (var columnIndex = 0; columnIndex<column; columnIndex++) { // For loop that creates columns.
        var columnElement = $('<div>')
            .addClass('column')
            .attr('id','column'+columnIndex);
        for (var heightIndex = 0; heightIndex<rows; heightIndex++) { // For loop that creates tiles.
            var tileElement = $('<div>')
                .addClass('tile')
                .attr('id','r' + heightIndex + 'c' + columnIndex);
            var tokenImg = $('<img>').attr('src','images/disc-blank.png').addClass('tokenImg');
            tileElement.append(tokenImg);
            tileElement.appendTo(columnElement);
        }
        columnElement.appendTo($('#gameBoard'));
    }
}

//called when user selects amount of players
function createArrGameBoard(rows = 6, cols = 7) {
    var gameBoardArr = [];
    for(var i=1;i<=cols;i++) {
        var colArr = new Array(rows); // column height === # of rows
        colArr.fill('X'); //'X' is placeholder for empty title
        gameBoardArr.push(colArr);
    }
    return gameBoardArr;
}

function clickHandler(){
    $('.column').on('click', function() {
        checkDropPosition($(this).attr('id'));

            console.log('You clicked on column:' + $(this).attr('id'))
        }
    )
}

function checkMove() {

}
function getFirstMove(){ // Determines which player gets to place token down first.
    var random = Math.ceil(Math.random() * playerArr.length); // Creates a random number based on the length of array.
    while (random !== playerArr[0].playerNumber) { // As long as player at 0 does not equal random number
        cyclePlayers(playerArr); // continue to cycle array.
    }
}

function cyclePlayers(array) {
    array.push(array.shift());
}

//check drop position and store token functions


//function uses a regex g modifer to do a global match between 0 and 9. in this case would be find the column id number.
//colIndex is the selected column index
//last index of x is the most bottom position in the column

function checkDropPosition(id){ //pass in col id this.attr('id')
    var colIndex = parseInt(id.match(/[0-9]/g).join(''));
    dropPosition[0] = colIndex;
    dropPosition[1] = gameBoardArr[colIndex].indexOf('X');
}

function storeToken(DropPosArray){
    gameBoardArr[DropPosArray[0]][DropPosArray[1]] = playerArr[0].tokenColor;
    updateDisplay('#r'+dropPosition[1]+'c'+dropPosition[0]);
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
    if (counter >= 3) {
        console.log('win');
        // return playerWin(playerArr[0]);
    }
}

function updateDisplay(tileId) {
  $(tileId+'> img').css('opacity','1.0').attr('src', 'images/disc-'+playerArr[0].tokenColor+'.png');//.toggle('transition');
  // var tokenDrop = setTimeout(function() {
  //     $(tileId+'> img').toggle('transition');
  // }, 1500);
}

function turnTimerToggle() {
    var counter = 15 - (occupiedTileCounter/2);


}

//increment this after each disc is dropped
var occupiedTileCounter = 0;

//storing the max number of tiles
var maxTiles = calcMaxTiles();

//calculates max tiles
function calcMaxTiles(){
    var maxTiles = 0;
    for(var i = 0; i < gameBoardArr.length; i++){
        maxTiles += gameBoardArr[i].length;
    }
    return maxTiles;
}

//checks if the game is a draw
function checkDrawGame(){
    if(occupiedTileCounter === maxTiles){
        console.log('draw game')
    }
}