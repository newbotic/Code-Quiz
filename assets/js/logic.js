document.addEventListener("DOMContentLoaded", function () {
  //DOM ready for manipulation
  var startButton = document.getElementById("start");
  var questionsDiv = document.getElementById("questions");
  var timerSpan = document.getElementById("time");
  var feedbackDiv = document.getElementById("feedback");
  var finalScoreSpan = document.getElementById("final-score");
  var initialsInput = document.getElementById("initials");
  var submitButton = document.getElementById("submit");
  var timerInterval;
  var initialsInput = document.getElementById("initials");
  var submitButton = document.getElementById("submit");

  // Adding audio elements

  var correctSound = new Audio("./assets/sfx/correct.wav");
  var incorrectSound = new Audio("./assets/sfx/incorrect.wav");

  var currentQuestionIndex = 0;
  var totalSeconds = 0;

  // add event listener to id Start Quiz button

  startButton.addEventListener("click", function () {
    startQuiz();
  });

  //startQuiz function

  function startQuiz() {
    var startScreen = document.getElementById("start-screen"); //find id start-screen
    startScreen.classList.add("hide"); //use classList method to add hide class
    questionsDiv.classList.remove("hide"); //use classList method to remove hide class

    // Call displayQuestion function

    displayQuestion();

    // Invoke StartTimer function and passing 75 seconds as argument

    startTimer(75);
  }
  // display question function

  function displayNextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      // No more questions, display the end screen
      showEndScreen();
      stopTimer();
      // hide start-screen
      var startScreen = document.getElementById("start-screen");
      startScreen.classList.add("hide");
      questionsDiv.classList.add("hide"); //use classList method to add hide class
    }
  }

  // display questions

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
          console.log("mouse cleared text");
          setTimeout(() => feedbackDiv.classList.add("hide"), 1000);
        });

        choiceButton.addEventListener("click", function (event) {
          console.log(event);
          var isCorrect = checkAnswer(currentQuestion, index);

          if (isCorrect) {
            feedbackDiv.classList.remove("hide");
            feedbackDiv.textContent = "Correct!";
            playAudio(correctSound);
          }

          displayNextQuestion();
        });

        choicesDiv.appendChild(choiceButton);
      });
    } else {
      showEndScreen();
      stopTimer();
      feedbackDiv.classList.remove("hide");
      feedbackDiv.textContent = "Wrong!";
      playAudio(correctSound);
    }
  }

  // end screen function

  function showEndScreen() {
    var endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hide");

    var finalScore = parseInt(timerSpan.textContent);
    finalScoreSpan.textContent = finalScore;

    feedbackDiv.classList.remove("hide");
    feedbackDiv.textContent = "Wrong!";
  }

  // start timer function

  function startTimer(initialSeconds, reset) {
    var seconds = initialSeconds;
    timerSpan.textContent = seconds;

    if (reset) {
      stopTimer();
    }

    timerInterval = setInterval(function () {
      if (currentQuestionIndex < questions.length) {
        seconds--;

        // Update the timer span

        timerSpan.textContent = seconds;

        // Update the totalSeconds with the remaining time

        totalSeconds = initialSeconds - seconds;

        if (seconds <= 0) {
          console.log("removing interval");

          showEndScreen();
          stopTimer();
        }
      }
    }, 1000);
  }

  // stop timer function

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function checkAnswer(question, selectedAnswerIndex) {
    var correctAnswerIndex = question.correctAnswer;
    var isCorrect = selectedAnswerIndex === correctAnswerIndex;
    console.log(question);

    // Display "Wrong!" feedback for incorrect answers

    if (!isCorrect) {
      feedbackDiv.classList.remove("hide");
      feedbackDiv.textContent = "Wrong!";
      subtractTime(15); // Subtract 15 seconds for incorrect answers
    }

    return isCorrect;
  }

  function subtractTime(seconds) {
    // Subtract the specified seconds from the timer

    var currentSeconds = parseInt(timerSpan.textContent);
    var newSeconds = Math.max(0, currentSeconds - seconds);

    // Update the timer span with the new time

    timerSpan.textContent = newSeconds;

    // Update the totalSeconds with the subtracted time

    totalSeconds += seconds;

    // Display feedback before restarting the timer

    feedbackDiv.classList.remove("hide");
    feedbackDiv.textContent = "Wrong!";
    playAudio(incorrectSound);

    // Restart the timer with the new time

    startTimer(newSeconds, "reset");
  }
});

// Play audio function

function playAudio(audioElement) {
  if (audioElement) {
    audioElement.play();
  }
}

var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var feedbackDiv = document.getElementById("feedback");
var timerSpan = document.getElementById("time");

submitButton.addEventListener("click", function () {
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var scoreData = {
      initials: initials,
      score: parseInt(timerSpan.textContent),
    };

    // Retrieving data (JSON formatted string)from localStorage and parsing as JSON (object)

    var existingScores = JSON.parse(localStorage.getItem("highscores")) || []; //if local storage null use empty array default value

    existingScores.push(scoreData);

    // Sort the scores by score value (from high to low)

    existingScores.sort((a, b) => b.score - a.score);

    // Save the updated scores to local storage

    localStorage.setItem("highscores", JSON.stringify(existingScores));

    // Use relative path for redirection

    window.location.href = "./highscores.html";
  }
});
