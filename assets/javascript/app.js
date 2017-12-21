var divsIds = ['subContainer1', 'subContainer2', 'subContainer3']
var seconds = 5;
var numberOfGames = 0;
var wins = 0;
var lost = 0;
var outOfTimeCounter = 0;
var timer;
var timer2;
var availableQuestionsObjects = [];
var questionPlaying;
var answer;
var clicked;

// creating the object
function TriviaQuestion(question, answer1, answer2, answer3, answer4, correctAnswer) {
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.answer4 = answer4;
  this.correctAnswer = correctAnswer;
}

function restartQuestions() {
  console.log("RESTART QUESTION");
  availableQuestionsObjects = [
    new TriviaQuestion("What is the name of the galaxy we live in?", "Milky Way", "Large Magellanic Cloud", "Andromeda", "Black Eye ", 1),
    new TriviaQuestion("What was the first computer programming language?", "MATRIX MATH", "Plankalkül", "BASIC", "Borland Pascal", 2),
    new TriviaQuestion("what is the tallest mountain on earth?", "K2", "Mount Everest", "Mauna Kea", "Cho Oyu", 3),
    new TriviaQuestion("What is the oldest shark in the world?", "hammerhead shark", "bull shark", "white shark", "Greenland shark", 4),
    new TriviaQuestion("How deep is the pacific ocean?", "35,797′", "27,841′", "26,401′", "23,740′", 1)
  ];
};

// -On click event to Start the game--------------------------------------------
$('#start').on("click", function(e) {
  console.log("Start Button - Clicked");
  playing();
});

// -building the screen of the game----------------------------------------
function creatingDivs() {
  $('#mainContainer').empty();
  for (var i = 0; i < divsIds.length; i++) {
    var divs = $('<div>');
    divs.attr('id', divsIds[i]);
    $('#mainContainer').append(divs)
    divs.addClass("subContainerClass" + [i + 1])
    divs.addClass("border")
  }
  creatingButtons()
  // --Answer click event---------------------------------------
  $('.buttonAnswer').on("click", function(e) {
    console.log("BUTTON ANSWER CLICK EVENT");
    if (clicked === false){
    var values = $(this).val();
    answer = parseInt(values)
    console.log('answer button value: ' + answer);
    answerVerification()
  } else{

  }
  });
  // --End answer click event-------------------------------------
}

// -Bulding the four buttons for the posibles answes----------------------------
function creatingButtons() {
  for (var i = 0; i < 4; i++) {
    var button = $('<button>');
    button.attr('value', [i + 1]);
    button.attr('id', "buttonPosition" + [i + 1]);
    $('#subContainer3').append(button)
    button.addClass("buttonAnswer")
  }
}

//-Choseing a random question---------------------------------------------------
function selectQuestion() {
  console.log("SELECT QUESTION");
  var random = Math.floor(Math.random() * (availableQuestionsObjects.length));
  console.log("random number:" + random);
  questionPlaying = availableQuestionsObjects[random];
  console.log("Question Playing: " + questionPlaying);
  availableQuestionsObjects.splice(random, 1);
  console.log(availableQuestionsObjects);

}

//-printing on screen the seleted question--------------------------------------
function printQuestion() {
  console.log("PRINT QUESTION");
  console.log("Question Playing: " + questionPlaying.question);
  $("#subContainer2").html('<h1>' + questionPlaying.question + '</h1>');
  $("#buttonPosition1").html(questionPlaying.answer1);
  $("#buttonPosition2").html(questionPlaying.answer2);
  $("#buttonPosition3").html(questionPlaying.answer3);
  $("#buttonPosition4").html(questionPlaying.answer4);

}

//-Countdown counter---------------------------------------------------------
function countDown(seconds) {
  console.log("COUNTDOWN");
  console.log("SECONDS LEFT: " + seconds);
  $("#subContainer1").html("Remainig Time: " + seconds);
  if (seconds < 1) {
    clearTimeout(timer);
    timer2 = setTimeout('outOfTime()', 1500);
    return
  }
  seconds--;
  timer = setTimeout('countDown(' + seconds + ')', 1000);
}

//----------------------------------------------------------------------------
function outOfTime() {
  console.log("OUT OF TIME");
  outOfTimeCounter++;
  clicked = true;
  console.log("Out of time counter: " + outOfTimeCounter);
  console.log('games counter' + numberOfGames);
  $("#subContainer1").html("Out of time!");
  correctAnswer()
}

//-Print on screen the correct answer-------------------------------------------
function correctAnswer() {
  $("#subContainer2").html("The Correct Answer was: " + questionPlaying.correctAnswer);
  $("#subContainer2").attr("src", "assets/images/gif.gif")
  clearTimeout(timer)
  timer = setTimeout('playing()', 3500);
}


//-Restart the parameters of the game-------------------------------------------
function restartGame() {
  console.log("RESTART GAME");
  clearTimeout(timer);
  clearTimeout(timer2);
  numberOfGames = 0
  wins = 0
  lost = 0
  outOfTime = 0
  console.log("Reset Status of: " + "wins: " + wins + "Lost: " + lost + "Out of time: " + outOfTime);
};

//-Calls the necessaries functions to play the game-----------------------------
function playing() {
  console.log("PLAY GAME");
  clicked = false;
  if (numberOfGames === 5) {
    gameOver()
  } else {
  clearTimeout(timer);
  clearTimeout(timer2);
  creatingDivs();
  restartQuestions();
  selectQuestion();
  printQuestion();
  numberOfGames++
  countDown(seconds)
  }
}
//-Verify the answer chosen by the player---------------------------------------
function answerVerification() {
  if (answer === questionPlaying.correctAnswer) {
    wins++;
    clicked = true;
    console.log('wins new value: ' + wins);
    $("#subContainer1").html("Correct!");
    $("#subContainer2").attr("src", "assets/images/gif.gif")
    clearTimeout(timer)
    timer = setTimeout('playing()', 3500);
  } else {
    lost++;
    clicked = true;
    console.log('lost new value: ' + lost);
    $("#subContainer1").html("Nope!");
    correctAnswer();
  }

}

//-building the Start screen-----------------------------------------------------

function initialPage(){
  $('#start').on("click", function(e) {
    console.log("Start Button - Clicked");
    playing();
  });

}

//-building the Game Over screen--------------------------------------------------
function gameOver() {
  creatingDivs()
  console.log("GAME OVER");
  $("#subContainer2").html("GAME OVER")
  $("#buttonPosition1").html("Correct: " + wins)
  $("#buttonPosition2").html("Incorrect : " + lost)
  $("#buttonPosition3").html("Unaswer: " + outOfTimeCounter)
  $("#buttonPosition4").html("Click to restart")

  if (answer === 4) {
    alert('restart the game');
}else{

}

  };
