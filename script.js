$(document).ready(initializeApp);

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
            tileElement.appendTo(columnElement);
        }
        columnElement.appendTo($('#gameBoard'));
    }
}

function clickHandler(){
    $('.column').on('click', function() {
            console.log('You clicked on column:' + $(this).attr('id'))
        }
    )
}

function getFirstMove(){ // Determines which player gets to place token down first.
    var random = Math.ceil(Math.random() * playerArr.length); // Creates a random number based on the length of array.
    while (random !== playerArr[0].playerNumber) { // As long as player at 0 does not equal random number
        cyclePlayers(); // continue to cycle array.
    }
}

function initializeApp(){
    createGameBoard();
    clickHandler();
    getFirstMove();
}