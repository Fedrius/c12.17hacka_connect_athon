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

