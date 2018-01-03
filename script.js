$(document).ready(initializeApp);

function createGameBoard(row,column) { // Function that creates the game board dynamically. Takes in number of rows and columns.
    var rows = row || 6; // Number of rows will be either what is dictated or defaults to 6.
    var column = column || 7; // Number of columns will be either what is dictated or defaults to 7.

    for (var columnIndex = 0; columnIndex<column; columnIndex++) { // For loop that creates columns.
        var columnElement = $('<div>')
            .addClass('column')
            .attr('id','column'+columnIndex);
        for (var heightIndex = 0; heightIndex<rows; heightIndex++) { // For loop that creates tiles in columns.
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

function initializeApp(){
    createGameBoard();
    clickHandler();
}