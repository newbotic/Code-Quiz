var startButton = document.getElementById("start");
var questionsDiv = document.getElementById("questions");
var timerSpan = document.getElementById("time");

// add event listener to start quiz 

startButton.addEventListener('click', function(){
  startQuiz();
})

function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  startScreen.classList.add("hide");

  questionsDiv.classList.remove("hide");
// Display the first question
displayQuestion();

// Start the timer at 75 seconds
startTimer(75);
}

// display question function

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    var currentQuestion = questions[currentQuestionIndex];

    var questionTitle = document.getElementById("question-title");
    questionTitle.textContent = currentQuestion.question;

    var choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    currentQuestion.answers.forEach(function (answer, index) {
      var choiceButton = document.createElement("button");

      choiceButton.textContent = (index + 1) + ". " + answer;

      choiceButton.addEventListener("click", function () {
        var isCorrect = checkAnswer(currentQuestion, index);

        if (isCorrect) {
          feedbackDiv.classList.remove('hide');
          feedbackDiv.textContent = "Correct!";
        } else {
          feedbackDiv.textContent = "Wrong!";
          subtractTime(15);
        }

        displayNextQuestion();
      });

      choicesDiv.appendChild(choiceButton);
    });
  } else {
    showEndScreen();
    stopTimer();
  }
}