var divsIds = ['subContainer1', 'subContainer2', 'subContainer3']
var seconds = 5
var numberOfGames = 0;
var wins = 0;
var lost = 0;
var outOfTimeCounter = 0;
var timer
var timer2
var availableQuestionsObjects = [];
var questionPlaying;

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
    new TriviaQuestion("question1", "Q1-Ans1", "Q1-Ans2", "Q1-Ans3", "Q1-Ans4", 1),
    new TriviaQuestion("question2", "Q2-Ans1", "Q2-Ans2", "Q2-Ans3", "Q2-Ans4", 2),
    new TriviaQuestion("question3", "Q3-Ans1", "Q3-Ans2", "Q3-Ans3", "Q3-Ans4", 3),
    new TriviaQuestion("question4", "Q4-Ans1", "Q4-Ans2", "Q4-Ans3", "Q4-Ans4", 4),
    new TriviaQuestion("question5", "Q5-Ans1", "Q5-Ans2", "Q5-Ans3", "Q5-Ans4", 1)
  ];
};

// ----------------------------------------------------------
$('#start').on("click", function(e) {
  console.log("Start Button - Clicked");
  playing();
});

// ----------------------------------------------------------
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
}

// ----------------------------------------------------------
function creatingButtons() {
  for (var i = 0; i < 4; i++) {
    var button = $('<button>');
    button.attr('id', "buttonPosition" + [i + 1]);
    $('#subContainer3').append(button)
    button.addClass("buttonAnswer")
  }
}

//----------------------------------------------------------------------------
function selectQuestion() {
  // if (numberOfGames > 4) {
  //   gameOver();
  // }
  console.log("SELECT QUESTION");
  var random = Math.floor(Math.random() * (availableQuestionsObjects.length));
  console.log("random number:" + random);
  questionPlaying = availableQuestionsObjects[random];
  console.log("Question Playing: " + questionPlaying.question);
  availableQuestionsObjects.splice(random, 1);

}

//----------------------------------------------------------------------------
function printQuestion() {
  console.log("PRINT QUESTION");
  console.log("Question Playing: " + questionPlaying.question);
  $("#subContainer2").html('<h1>' + questionPlaying.question + '</h1>');
  $("#buttonPosition1").html(questionPlaying.answer1);
  $("#buttonPosition2").html(questionPlaying.answer2);
  $("#buttonPosition3").html(questionPlaying.answer3);
  $("#buttonPosition4").html(questionPlaying.answer4);

}

//----------------------------------------------------------------------------
function countDown(seconds) {
  console.log("COUNTDOWN");
  console.log("SECONDS LEFT: " + seconds);
  $("#subContainer1").html("Remainig Time: " + seconds);
  if (seconds < 1) {
    clearTimeout(timer);
    var timer2 = setTimeout('outOfTime()', 1500);
    return
  }
  seconds--;
  var timer = setTimeout('countDown(' + seconds + ')', 1000);
}

//----------------------------------------------------------------------------
function outOfTime() {
  console.log("OUT OF TIME");
  outOfTimeCounter++;
  console.log("Out of time counter: " + outOfTimeCounter);
  $("#subContainer2").html("Correct Answer: " + questionPlaying.correctAnswer);
  $("#subContainer2").attr("src", "assets/images/gif.gif")
  var timer = setTimeout('playing()', 1500);
  console.log("Number of Games: " + numberOfGames);
}

//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------

$('.buttonAnswer').on("click", function(e) {
  console.log("BUTTON ANSWER CLICK EVENT");
  playing();
});

//----------------------------------------------------------------------------
function playing() {
  if (numberOfGames === 2) {
    gameOver()
  }
  creatingDivs();
  restartQuestions();
  selectQuestion();
  printQuestion();
  numberOfGames++
  countDown(seconds)
}

//----------------------------------------------------------------------------
function gameOver() {
  creatingDivs()
  console.log("GAME OVER");
  $("#subContainer2").html("GAME OVER")
  $("#buttonPosition1").html("Correct: " + wins)
  $("#buttonPosition2").html("Incorrect : " + lost)
  $("#buttonPosition3").html("Unaswer: " + outOfTimeCounter)
  $("#buttonPosition4").html("Click to restar")
  debugger


}
