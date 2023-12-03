var startButton = document.getElementById("start");
var questionsDiv = document.getElementById("questions");
var timerSpan = document.getElementById("time");

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