var buttonsColors = ["red","green","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var initialGame = false;
var gameOver = false;
var level = 0;
var checkVar = 0;


function initialFirstGame(){
    if(!initialGame){
        nextSequence();
        initialGame = true;
        return;
    }
    if(gameOver){
        gamePattern = [];
        userClickedPattern = [];
        checkVar = 0;
        level = 0;
        $("body").removeClass("game-over");
        gameOver = false;
        nextSequence();
    }

}
function nextSequence(){
        $("h1").text("level "+ level);
        var randomNumber = Math.floor(Math.random()*4);
        randomColor = buttonsColors[randomNumber];
        gamePattern.push(randomColor);
        var color = gamePattern[level];
        $("#"+ color).fadeOut(100).fadeIn(100);
        var audio = new Audio("sounds/" + color + ".mp3");
        audio.play();
    
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  
}

function animatedPress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(() => {  $("#"+ currentColor).removeClass("pressed"); }, 100);
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
    
}

function checkAnswer(gameLevel){
    if(userClickedPattern.pop() != gamePattern[checkVar]){
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("GAME OVER :( \n Press Any Key To Restart");
        $("body").addClass("game-over");
        gamePattern = 0;
        gameOver = true;
    }
    checkVar += 1;
    if((checkVar > gameLevel) && (!gameOver)){
        setTimeout(() => {  nextSequence(); }, 1000);
        level += 1;
        checkVar = 0;
        userClickedPattern = [];
    }
   
}

$("div.container").click(function(evn){
    if (gamePattern.length != 0){
        var userChosenColor = evn.target.id;
        userClickedPattern.push(userChosenColor);
        animatedPress(userChosenColor);
        checkAnswer(level);
    }
});

$(document).keypress(initialFirstGame);







