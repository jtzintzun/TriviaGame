
var divsIds = ['subContainer1', 'subContainer2', 'subContainer3']
var seconds = 5;
var numberOfGames = 0;
var wins = 0;
var lost = 0;
var outOfTimeCounter = 0;
var timer;
var availableQuestionsObjects = [];
var questionPlaying;
var answer;
var clicked;

// creating the object
function TriviaQuestion(question, answer1, answer2, answer3, answer4, correctAnswer, correctAnswerWord, gif) {
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.answer4 = answer4;
  this.correctAnswer = correctAnswer;
  this.correctAnswerWord = correctAnswerWord;
  this.gif = gif;
}

function restartQuestions() {
  console.log("RESTART QUESTION");
  availableQuestionsObjects = [
    new TriviaQuestion("What is the name of the galaxy we live in?", "Milky Way", "Large Magellanic Cloud", "Andromeda", "Black Eye ", 1, "Milky Way","gif1.gif"),
    new TriviaQuestion("What was the first computer programming language?", "MATRIX MATH", "Plankalkül", "BASIC", "Borland Pascal", 2, "Plankalkül","gif2.gif"),
    new TriviaQuestion("what is the tallest mountain on earth?", "K2", "Mount Everest", "Mauna Kea", "Cho Oyu", 3, "Mauna Kea","gif3.gif"),
    new TriviaQuestion("What is the oldest shark in the world?", "hammerhead shark", "bull shark", "white shark", "Greenland shark", 4, "Greenland shark","gif4.jpg"),
    new TriviaQuestion("How deep is the pacific ocean?", "35,797′", "27,841′", "26,401′", "23,740′", 1, "35,797′","gif5.gif")
  ];
};

initialPage()

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
    if (clicked === false) {
      var values = $(this).val();
      answer = parseInt(values)
      console.log('answer button value: ' + answer);
      answerVerification()
    } else {

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
  console.log("availableQuestionsObjects before splice: " + availableQuestionsObjects);
  availableQuestionsObjects.splice(random, 1);
  console.log("availableQuestionsObjects after splice: " +  availableQuestionsObjects);

}

//-printing on screen the seleted question--------------------------------------
function printQuestion() {
  console.log("PRINT QUESTION");
  console.log("Question Playing: " + questionPlaying.question);
  $("#subContainer2").html('<h2>' + questionPlaying.question + '</h2>');
  $("#buttonPosition1").html(questionPlaying.answer1);
  $("#buttonPosition2").html(questionPlaying.answer2);
  $("#buttonPosition3").html(questionPlaying.answer3);
  $("#buttonPosition4").html(questionPlaying.answer4);

}

//-Countdown counter---------------------------------------------------------
function countDown(seconds) {
  console.log("COUNTDOWN");
  console.log("SECONDS LEFT: " + seconds);
  $("#subContainer1").html('<h3>'+"Remainig Time: " + seconds +'</h3>');
  if (seconds < 0) {
    console.log("seconds are less than zero");
    //debugger
      outOfTimeF();
    return
  }
  seconds--;
  timer = setTimeout('countDown(' + seconds + ')', 1000);
}

//----------------------------------------------------------------------------
function outOfTimeF() {
  console.log("OUT OF TIME");
  clicked = true;
  outOfTimeCounter++;
  console.log("Out of time counter: " + outOfTimeCounter);
  console.log('games counter' + numberOfGames);
  $("#subContainer1").html('<h2>'+"Out Of Time!"+'</h2>');
  console.log(clicked);
debugger
  correctAnswer()
}

//-Print on screen the correct answer-------------------------------------------
function correctAnswer() {
  $("#subContainer2").html('<h2>'+"The Correct Answer was: " + questionPlaying.correctAnswerWord +'</h2>');
  image();
  clearTimeout(timer)
  timer = setTimeout('playing()', 3500);
}

//-Restart the parameters of the game-------------------------------------------
function restartGame() {
  console.log("RESTART GAME");
  clearTimeout(timer);
  numberOfGames = 0
  wins = 0
  lost = 0
  outOfTimeCounter = 0
  console.log("Reset Status of: " + "wins: " + wins + "Lost: " + lost + "Out of time: " + outOfTimeCounter);
};

//-Calls the necessaries functions to play the game-----------------------------
function playing() {
  console.log("PLAY GAME");
  clicked = false;
  if (numberOfGames === 5) {
    gameOver()
  } else {
    clearTimeout(timer);
    creatingDivs();
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
    $("#subContainer1").html('<h2>'+"Correct!"+'</h2>');
    image();
    clearTimeout(timer)
    timer = setTimeout('playing()', 3500);
  } else {
    lost++;
    clicked = true;
    console.log('lost new value: ' + lost);
    $("#subContainer1").html('<h2>'+"Nope!"+'</h2>');
    correctAnswer();
  }

}

//-building the Start screen-----------------------------------------------------

function initialPage() {
  $('#mainContainer').empty();
  var button = $('<button>');
  button.attr('id', "start");
  $('#mainContainer').append(button)
  button.addClass("button")
  button.text('Start')
  $('#start').on("click", function(e) {
    console.log("Start Button - Clicked");
    restartGame();
    restartQuestions();
    playing();
  });

}

//-building the Game Over screen--------------------------------------------------
function gameOver() {
  $('#subContainer1').empty()
  $('#subContainer2').empty()
  $('#subContainer3').empty()
  console.log("GAME OVER");
  $("#subContainer1").html('<h3>' + "GAME OVER"+'</h3>');
  for (var i = 0; i < 3; i++) {
    var button = $('<button>');
    button.attr('id', "buttonPosition" + [i + 1]);
    $('#subContainer2').append(button)
    button.addClass("buttonResults")
  }
  var button = $('<button>');
  button.attr('id', "restart");
  $('#subContainer3').append(button)
  button.addClass("buttonAnswer")
  $("#buttonPosition1").html("Correct: " + wins)
  $("#buttonPosition2").html("Incorrect : " + lost)
  $("#buttonPosition3").html("Unaswer: " + outOfTimeCounter)
  $("#restart").html("Click to restart")

  $('#restart').on("click", function(e) {
    console.log("Restart Button - Clicked");
    initialPage();
  });
};

function image(){
  var image = $('<img>');
  image.attr("src", "assets/images/"+ questionPlaying.gif);
  $("#subContainer2").append(image)
}
