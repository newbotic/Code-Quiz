document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("start");
  var questionsDiv = document.getElementById("questions");
  var timerSpan = document.getElementById("time");
  var feedbackDiv = document.getElementById("feedback");
  var finalScoreSpan = document.getElementById("final-score");
  var timerInterval;

  startButton.addEventListener("click", function () {
    startQuiz();
  });

  var currentQuestionIndex = 0;
  var totalSeconds = 0;

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

        choiceButton.textContent = index + 1 + ". " + answer;

        choiceButton.addEventListener("mouseover", function () {
          feedbackDiv.classList.add("hide");
        });

        choiceButton.addEventListener("click", function () {
          var isCorrect = checkAnswer(currentQuestion, index);

          if (isCorrect) {
            feedbackDiv.classList.remove("hide");
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

  // -----------------------------------------------

  function displayNextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions
    // if (currentQuestionIndex < questions.length) {
    displayQuestion();
    // } else {
    // No more questions, display the end screen
    //     showEndScreen();
    //     stopTimer();
    //   }
  }

  // -------------------------------------------------------
  function showEndScreen() {
    var endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hide");

    var finalScore = parseInt(timerSpan.textContent);
    finalScoreSpan.textContent = finalScore;
  }

  // -------------------------------------------

  function startTimer(initialSeconds) {
    var seconds = initialSeconds;
    timerSpan.textContent = seconds;

    timerInterval = setInterval(function () {
      if (currentQuestionIndex < questions.length) {
        seconds--;

        // Update the timer span
        timerSpan.textContent = seconds;

        // Update the totalSeconds with the remaining time
        totalSeconds = initialSeconds - seconds;

        // ----------------------------------------
        if (seconds === 0) {
          clearInterval(timerInterval);
          showEndScreen();
          stopTimer();
        }
      }
    }, 1000);
  }

  // --------------------------------------------------

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function checkAnswer(question, selectedAnswerIndex) {
    var correctAnswerIndex = 0;
    return selectedAnswerIndex === correctAnswerIndex;
  }

  function subtractTime(seconds) {
    // Subtract the specified seconds from the timer
    var currentSeconds = parseInt(timerSpan.textContent);
    var newSeconds = Math.max(0, currentSeconds - seconds);

    // Update the timer span with the new time
    timerSpan.textContent = newSeconds;

    // Update the totalSeconds with the subtracted time
    totalSeconds += seconds;

    // Restart the timer with the new time
    startTimer(newSeconds);
  }
});
