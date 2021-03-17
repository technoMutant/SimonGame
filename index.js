var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;
$(document).keypress(function() {
  if (!start) {
    nextSequence();
  }
  start = true;
});

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(3 * Math.random());
  var randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  playSound(randomColour);
  $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);

}
$(".btn").click(function(event) {

  var userClickedButtonColour = $(this).attr("id");
  userClickedPattern.push(userClickedButtonColour);
  playSound(userClickedButtonColour);
  animatePress(userClickedButtonColour);
  checkAnswer(userClickedPattern.length - 1);


});

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function checkAnswer(length) {
  if (userClickedPattern[length] === gamePattern[length]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  } else {
    gameOver();

  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

function startOver() {
  gamePattern = [];
  start = false;
  level = 0;

}
