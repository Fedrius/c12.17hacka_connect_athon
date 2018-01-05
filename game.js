$(document).ready(initializeApp);

var gameBoardArr = [];
var playerArr = [];
var dropPosition = new Array(2);
var maxTiles = null;
var occupiedTileCounter = 0;

function initializeApp(){
    $('.start-button').on('click', startGame);
}
// Pre-game set-up logic below:
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
    createInputFields(playerAmount);
    gameBoardArr = createArrGameBoard((2+(playerAmount*2)),(3+(playerAmount*2)));
    createGameBoard((2+(playerAmount*2)),(3+(playerAmount*2)));
    maxTiles = calcMaxTiles();
    addClickHandlers();
    applyColHover();

    $('.intro-container').css('display', 'none');
    $('.main-splash-container').css('display', 'flex');
}

function makePlayerTokenArr(num = 2) {
    var playerTokenArr = [];
    for (var i=1;i<=num;i++) {
        playerTokenArr.push({
            'playerNumber': i,
            'name': 'User' + i,
            'tokenColor': ''
        });
    }
    return playerTokenArr;
}

function createGameBoard(row,column) {
    var rows = row || 6;
    var columns = column || 7;

    for (var columnIndex = 0; columnIndex<columns; columnIndex++) {
        var columnElement = $('<div>')
            .addClass('column')
            .attr('id','column'+columnIndex);
        for (var heightIndex = 0; heightIndex<rows; heightIndex++) {
            var tileElement = $('<div>')
                .addClass('tile')
                .attr('id','r' + heightIndex + 'c' + columnIndex);
            var tokenImg = $('<img>').attr('src','images/494949.png').addClass('tokenImg');
            tileElement.append(tokenImg);
            tileElement.appendTo(columnElement);
        }
        columnElement.appendTo($('#gameBoard'));
    }
}

function createArrGameBoard(rows = 6, cols = 7) {
    var gameBoardArr = [];
    for(var i=1;i<=cols;i++) {
        var colArr = new Array(rows);
        colArr.fill('X');
        gameBoardArr.push(colArr);
    }
    return gameBoardArr;
}

function calcMaxTiles(){
    maxTiles = gameBoardArr.length*gameBoardArr[0].length;
    return maxTiles;
}

function createInputFields(num){

    for(var index = 1; index <= num; index++){
        var container = $("<div>").addClass('player-' + index + '-container').css({"display": "none", "flex-direction": "column"});
        var nameInput = $("<input>").attr('type', 'text').attr('placeholder', 'USER ' + index + ' NAME HERE');

        container.append(nameInput);
        $('.player-input-container').append(container);
    }

    $('.player-1-container').css('display', 'flex');

    var img = ['bf0050', 'ff610f', '00ffff', 'ffa91a', '731572'];
    for(var index2 = 0; index2 < 5; index2++){
        var token = $("<img>").addClass('token glow').attr('src', './images/' + img[index2] + '.png').attr('alt', '');
        $('.token-container').append(token);
    }

    $('.token').on('click', getUserInfo);
}

function getUserInfo(){
    var currentPlayerInput = $('.player-' + playerArr[0].playerNumber +'-container > input');
    if(currentPlayerInput.val() === ''){
        playerArr[0].name = 'USER ' + playerArr[0].playerNumber;
    } else {
        playerArr[0].name = currentPlayerInput.val();
    }

    playerArr[0].tokenColor = $(this).attr('src');

    $(this).attr('src', './images/494949.png');
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
    randomizeFirstMove();
}
// Game logic below:
function addClickHandlers(){
    $('.column').on('click', function() {
        // $(this).is(':hover').css({
        //     'box-shadow': 'inset 0px 0px 10px 6px #' + playerArr[0].tokenColor.slice(-10,-4)
        // });
        checkDropPosition($(this).attr('id'));
        if(dropPosition[1] === -1) {
            return ;
        }
        storeToken(dropPosition);
        checkWins();
        }
    )
}

// Determines which player goes first.
function randomizeFirstMove(){
    var random = Math.ceil(Math.random() * playerArr.length);
    while (random !== playerArr[0].playerNumber) {
        cyclePlayers(playerArr);
    }
}
// Changes current player turn.
function cyclePlayers(array) {
    array.push(array.shift());
    // columnColor();
}
// Changes column indicator color.
function applyColHover(){
    // var colorCode = playerArr[0].tokenColor.slice(-10,-4);
    $('.column').hover(
        function(){
            $(this).css({
                'box-shadow': 'inset 0px 0px 10px 6px #' + playerArr[0].tokenColor.slice(-10,-4),
            })
            $(this).click(function() {
                $(this).css({
                    'box-shadow': 'inset 0px 0px 10px 6px #' + playerArr[1].tokenColor.slice(-10,-4),
                })
            })
        },
        // })
        function(){
            $(this).css({
                'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0)'
            })
        });
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

function updateDisplay(tileId) {
    if(dropPosition[1] === gameBoardArr[0].length-1) {
        $(tileId+'> img').css('opacity','1.0').attr('src', playerArr[0].tokenColor);
        cyclePlayers(playerArr);
        return occupiedTileCounter++;
    }
    $('.column').off('click');

    var columnTokens = $('#column' + dropPosition[0] + ' .tokenImg');
    var currentRow = gameBoardArr[0].length - 1;
    var glow = setInterval(dropAnimation, 50);

    function dropAnimation(){

        if(currentRow === dropPosition[1] + 1){
            clearInterval(glow);
            $(tileId+'> img').css('opacity','1.0').attr('src', playerArr[0].tokenColor);
            occupiedTileCounter++;
            cyclePlayers(playerArr);
            addClickHandlers();
        }
        $(columnTokens[currentRow]).attr('src', playerArr[0].tokenColor);
        setTimeout(blankReset, 50, columnTokens[currentRow]);
        currentRow--;
    }

    function blankReset(element){
        $(element).attr('src', './images/494949.png');
    }
}

// Win check logic starts below:
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
                endGame('VERTICAL');
                return;
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
                endGame('HORIZONTAL');
                return;
            }
        } else {
            match = 0;
        }
    }
}

function checkNEDiagonals(dropPos) { //dropPos = array [col#, height]
    var cursor = dropPos.slice();
    var cursorVal = gameBoardArr[cursor[0]][cursor[1]];
    var counter = 0;
    if(cursor[0] === gameBoardArr.length-1 ||cursor[1] === gameBoardArr[0].length-1) {
        //if loop is going to go out of bounds, do not enter
    } else {
        while( cursorVal === gameBoardArr[cursor[0]+1][cursor[1]+1] ) { // while top right corner is the same token move to top right corner;
            cursor[0]++; cursor[1]++;
            if(cursor[0] === gameBoardArr[0].length || cursor[1] === gameBoardArr[0].length) {
                break;
            }
        }
    }
    if(cursor[0] === 0 || cursor[1] === 0) {
        //if loop is going to go out of bounds, do not enter
    } else {
        while(cursorVal === gameBoardArr[cursor[0]-1][cursor[1]-1]) {
            cursor[0]--; cursor[1]--;
            counter++;
            if(cursor[0] === 0 || cursor[1] === 0) {
                break;
            }
        }
    }
    if (counter >= 3) {
        endGame('DIAGONAL');
        return;
    }
}

function checkSWDiagonals(dropPos) { //dropPos = array [col#, height]
    var cursor = dropPos.slice();
    var cursorVal = gameBoardArr[cursor[0]][cursor[1]];
    var counter = 0;
    if(cursor[0] === 0 || cursor[1] === gameBoardArr[0].length-1) {
        //if loop is going to go out of bounds, do not enter
    } else {
        while( cursorVal === gameBoardArr[cursor[0]-1][cursor[1]+1]) {
            cursor[0]--; cursor[1]++;
            if(cursor[0] === 0 || cursor[1] === gameBoardArr[0].length-1) {
                break;
            }
        }
    }

    if(cursor[0] === gameBoardArr.length-1 ||cursor[1] === 0) {
        //if loop is going to go out of bounds, do not enter
    } else {
        while(cursorVal === gameBoardArr[cursor[0]+1][cursor[1]-1]) {
            cursor[0]++; cursor[1]--;
            counter++;
            if(cursor[0] === gameBoardArr.length-1 || cursor[1] === 0) {
                break;
            }
        }
    }
    if (counter >= 3) {
        endGame('DIAGONAL');
        return;
    }
}

function checkDrawGame(){
    if(occupiedTileCounter === maxTiles){
        endGame('DRAW');
        return;
    }
}

// End game logic starts below:
function endGame(typeOfWin){
    var winModal = $('.win-modal');
    var userName = $('.winning-player');
    var endingMove = $('.winning-play');
    var playerColor = playerArr[0].tokenColor;
    playerColor = playerColor.slice(-10,15);

    winModal.css('display', 'flex');

    if(typeOfWin ==='DRAW'){
        userName.text(typeOfWin).css('text-shadow', '0 0 15px #ffffff');
        endingMove.css('display', 'none');
    }else{
        userName.text(playerArr[0].name + ' WINS!').css('text-shadow', '0 0 15px #' + playerColor);
        endingMove.text('WITH A  ' + typeOfWin + ' WIN' );
    }

    $('.play-again').on('click', softResetGame);
    $('.reset').on('click', resetBackToSplash);

    return;
}

function softResetGame(){
    $('.win-modal').hide();
    occupiedTileCounter = 0;
    $('#gameBoard .column').remove();
    gameBoardArr = createArrGameBoard((2+(playerArr.length*2)),(3+(playerArr.length*2)));
    createGameBoard((2+(playerArr.length*2)),(3+(playerArr.length*2)));
    addClickHandlers();
}

function resetBackToSplash(){
    $('.win-modal').hide();
    occupiedTileCounter = 0;
    $('#gameBoard .column').remove();
    $('.player-input-container div').remove();
    $('.token-container img').remove();
    $('#gameBoard').css('display', 'none');
    $('.intro-container').css('display', 'flex');
}

// In ongoing development:
// function turnTimerToggle() {
//     var counter = 15 - Math.min(11, Math.floor(occupiedTileCounter/2)); // turnTimer starts at 15secs and will minus 1 every 2 turns; min. time = 4 secs
//     if(timerOn) {
//         clearInterval(startTimer);
//     }
//     var startTimer = setInterval(function() {
//         counter--;
//         if (!counter) {
//             clearInterval(startTimer);
//             turnTimerToggle();
//         }
//     }, 1000);
// }
