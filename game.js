$(document).ready(initializeApp);

var gameBoardArr = [];
var playerArr = [];
var dropPosition = new Array(2);
var maxTiles = null;
var occupiedTileCounter = 40;

function initializeApp(){
    $('.start-button').on('click', startGame);
    addClickHandlers();
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

    playerArr = makePlayerTokenArr(playerAmount);
    gameBoardArr = createArrGameBoard();
    createInputFields(playerAmount);
    createGameBoard();
    maxTiles = calcMaxTiles();


    $('.intro-container').css('display', 'none');
    $('.main-splash-container').css('display', 'flex');
}


function createInputFields(num){

    var lineBreak = $("<br>");

    for(var index = 1; index <= num; index++){
        var container = $("<div>").addClass('player-' + index + '-container').css({"display": "none", "flex-direction": "column"});
        var title = $("<div>").addClass('player-title ' + index).text('User ' + index);
        var nameInput = $("<input>").attr('type', 'text');

        container.append(title, nameInput);
        $('.player-input-container').append(container);
    }

    $('.player-1-container').css('display', 'flex');
    $('.token').on('click', getUserInfo);
}

function getUserInfo(){

    playerArr[0].name = $('<input>').val();
    playerArr[0].tokenColor = $(this).attr('src');

    $(this).attr('src', './images/disc-blank.png');
    $(this).off('click').removeClass('glow');
    $('.player-'+playerArr[0].playerNumber+'-container').css('display', 'none');
    $('.player-'+ (playerArr[0].playerNumber+1) +'-container').css('display', 'flex');

    if(playerArr[0].playerNumber === playerArr.length){
        hideIntro();
    }

    cyclePlayers(playerArr);
}

function hideIntro(){
    $('.main-splash-container').hide();
    $('#gameBoard').css('display', 'flex');
    $('.background').css('opacity', 0.2);
}


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

function addClickHandlers(){
    $('.column').on('click', function() {
        console.log('You clicked on column:' + $(this).attr('id'));
        checkDropPosition($(this).attr('id'));
        if(dropPosition[1] === -1) {
            console.log('that col is full'); return 'that col is full';
        }
        storeToken(dropPosition);
        checkWins();
        cyclePlayers(playerArr);
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

function checkDropPosition(id){ //pass in col id this.attr('id')
    var colIndex = parseInt(id.match(/[0-9]/g).join(''));
    dropPosition[0] = colIndex;
    dropPosition[1] = gameBoardArr[colIndex].indexOf('X');
}

function storeToken(DropPosArray){
    gameBoardArr[DropPosArray[0]][DropPosArray[1]] = playerArr[0].playerNumber;
    updateDisplay('#r'+dropPosition[1]+'c'+dropPosition[0]);
}

function checkWins() {
    checkVerticalWin(dropPosition[0]);
    checkHorizontalWin(dropPosition[1]);
    checkNEDiagonals(dropPosition);
    checkSWDiagonals(dropPosition);

    checkDrawGame();
}

function checkVerticalWin(colIndex){
    var theTokenColumn = gameBoardArr[colIndex];

    var match = 0;
    for(var columnIndex = 0; columnIndex < theTokenColumn.length; columnIndex++){
        if(gameBoardArr[colIndex][dropPosition[1]] === theTokenColumn[columnIndex]){
            match++;
            if(match >= 4){
                console.log('winnnner');//player wins
                break;
            }
        } else {
            match = 0;
        }
    }
}

function checkHorizontalWin(rowPosIndex){

    var match = 0;
    for (var columnIndex = 0; columnIndex < gameBoardArr.length; columnIndex++) {
        if (gameBoardArr[dropPosition[0]][rowPosIndex] === gameBoardArr[columnIndex][rowPosIndex]) {
            match++;
            if (match >= 4) {
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
    if(dropPosition[0] === gameBoardArr.length-1 ||dropPosition[1] === gameBoardArr[0].length-1) {
        '';
    } else {
        while( cursorVal === gameBoardArr[dropPosition[0]+1][dropPosition[1]+1] ) { // while top right corner is the same token move to top right corner;
            dropPosition[0]++; dropPosition[1]++;
            if(dropPosition[0] === gameBoardArr[0].length || dropPosition[1] === gameBoardArr[0].length) {
                break;
            }
        }
    }
    if(dropPosition[0] === 0 || dropPosition[1] === 0) {
        '';
    } else {
        while(cursorVal === gameBoardArr[dropPosition[0]-1][dropPosition[1]-1]) {
            dropPosition[0]--; dropPosition[1]--;
            counter++;
            if(dropPosition[0] === 0 || dropPosition[1] === 0) {
                break;
            }
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
    if(dropPosition[0] === 0 || dropPosition[1] === gameBoardArr[0].length-1) {
        '';
    } else {
        while( cursorVal === gameBoardArr[dropPosition[0]-1][dropPosition[1]+1]) {
            dropPosition[0]--; dropPosition[1]++;
            if(dropPosition[0] === 0 || dropPosition[1] === gameBoardArr[0].length-1) {
                break;
            }
        }
    }
    if(dropPosition[0] === gameBoardArr.length-1 ||dropPosition[1] === 0) {
        '';
    } else {
        while(cursorVal === gameBoardArr[dropPosition[0]+1][dropPosition[1]-1]) {
            dropPosition[0]++; dropPosition[1]--;
            counter++;
            if(dropPosition[0] === gameBoardArr.length-1 || dropPosition[1] === 0) {
                break;
            }
        }
    }
    if (counter >= 3) {
        console.log('win');
        // return playerWin(playerArr[0]);
    }
}

function updateDisplay(tileId) {

    $('.column').off();

    var columnTokens = $('#column' + dropPosition[0] + ' .tokenImg');
    var currentRow = gameBoardArr[0].length - 1;
    var glow = setInterval(dropAnimation, 250);


    function dropAnimation(){
        if(currentRow === dropPosition[1] + 1){
            clearInterval(glow);
            $(tileId+'> img').css('opacity','1.0').attr('src', playerArr[0].tokenColor);//.toggle('transition');
            occupiedTileCounter++;
            addClickHandlers();
        }
        $(columnTokens[currentRow]).attr('src', playerArr[0].tokenColor);
        setTimeout(blankReset, 500, columnTokens[currentRow]);
        currentRow--;
    }

    function blankReset(element){
        $(element).attr('src', './images/disc-blank.png');
    }
}

function setTile(tileId){
    $(tileId+'> img').css('opacity','1.0').attr('src', playerArr[0].tokenColor);
    occupiedTileCounter++;
}

function turnTimerToggle() {
    var counter = 15 - (occupiedTileCounter/2);


}

//calculates max tiles
function calcMaxTiles(){
    maxTiles = gameBoardArr.length*gameBoardArr[0].length;
    // for(var i = 0; i < gameBoardArr.length; i++){
    //     maxTiles += gameBoardArr[i].length;
    // }
    return maxTiles;
}

//checks if the game is a draw
function checkDrawGame(){
    if(occupiedTileCounter === maxTiles){
        console.log('draw game');
        console.log('restarting in 5 sec');
        setTimeout(resetGame, 5000)
    }
}

function resetGame(){
    occupiedTileCounter = 0;
    $('#gameBoard div').remove();
    gameBoardArr = createArrGameBoard(); //need to put in parameters for dynamic game board
    createGameBoard(); //need to put in parameters for dynamic game board
}

