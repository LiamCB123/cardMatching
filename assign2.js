var active = false;
var scoreCheck = 0;
let cards = ['ant.jpg','ant.jpg','cat.jpg','cat.jpg','dog.jpg','dog.jpg','bird.jpg','bird.jpg', 'mouse.jpg', 'mouse.jpg', 'turtle.jpg', 'turtle.jpg'];
let flipCards = [];
var time = 0;

function startTimer() {
    
    

    if(active) {
        
        var timer = document.getElementById("timerCount").innerHTML;
        var arr = timer.split(":");
        time = arr[1];
        time++;
        document.getElementById("timerCount").innerHTML = "Timer: " + time;
        setTimeout(startTimer, 1000);
    }
}
function reset() {
    counter = 0;
    active = false;
}


function startGame() {
    
    active = true;
    startTimer();
    $('#game-board').empty().append(shuffleArray(cards).map(card =>
        `<div class="card" data-image="${card}">
            <img src="${card}" height="200px" width="200px" style="visibility: hidden">
        </div>`
    ).join(''));
   $(".card").on('click',flipCard);
    
    


}
function hide(x) {
    x.style.display='none';
}
function flipCard() {
    if ($(this).hasClass('flipped') || flipCards.length === 2) return;
    $(this).addClass('flipped');
    $(this).find('img').css('visibility', 'visible');
    flipCards.push($(this));
    if (flipCards.length === 2) setTimeout(checkMatch, 750);
    
    
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function checkMatch() {
    const [card1, card2] = flipCards;
    if(card1.data('image') === card2.data('image')) {
        updateScore();
        if(scoreCheck == cards.length / 2) {
            window.alert('Game Won! Your Score is ' + scoreCheck + ' and your time is '+ time + ' seconds');
            active = false;
            $('#game-board').css('display', 'none');
            $('#Restart').css('visibility','visible');
        }
        
    } else{
        card1.find('img').css('visibility', 'hidden');
        card2.find('img').css('visibility', 'hidden');
        card1.removeClass('flipped');
        card2.removeClass('flipped');
       
    }
    flipCards = [];
}
function updateScore() {
    
    scoreCheck++;
    document.getElementById("scoreCount").innerHTML = "Current Score: " + scoreCheck;
}
function restart(){
    $('#Restart').css('visibility','hidden');
    scoreCheck = 0;
    time = 0;
    document.getElementById("timerCount").innerHTML = "Timer: " + time;
    document.getElementById("scoreCount").innerHTML = "Current Score: " + scoreCheck;
    $('#game-board').css('display', 'grid');
    $('#game-board').css('justify-content', 'center');
    startGame();

}
