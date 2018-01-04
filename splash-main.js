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

    // makePlayerTokenArr(playerAmount);
    createInputFields(playerAmount);

    $('.intro-container').css('display', 'none');
    $('.main-splash-container').css('display', 'flex');
}


function createInputFields(num){

    var lineBreak = $("<br>");

    for(var index = 1; index <= num; index++){
        var container = $("<div>").addClass('player-' + index + '-container').css({"display": "none", "flex-direction": "column"});
        var title = $("<div>").addClass('player-title').text('User ' + index + ':');
        var nameInput = $("<input>").attr('type', 'text');
        var submit = $("<button>").addClass('submit').text('SUBMIT').css('margin-top', '5vh');

        container.append(title, nameInput, lineBreak , lineBreak, submit);
        $('.player-input-container').append(container);
    }

    $('.player-1-container').css('display', 'flex');

}
