$(document).ready(initializeApp);

function createGameBoard(row,column) {
    var rows = row || 6;
    var column = column || 7;

    for (var columnIndex = 0; columnIndex<column; columnIndex++) {
        var columnElement = $('<div>')
            .addClass('column')
            .attr('id','column'+columnIndex);
        for (var heightIndex = 0; heightIndex<rows; heightIndex++) {
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