var startButton = document.getElementById("start");

// add event listener

startButton.addEventListener("click", function () {
  startQuiz();
});

// Array of Objects

var questions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: ["var x = 5;", "variable x = 5;", "x = 5;", "int x = 5;"],
    correctAnswer: 0,
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    answers: ["==", "===", "=", "!="],
    correctAnswer: 1,
  },
  {
    question: "What does the 'DOM' stand for?",
    answers: [
      "Document Object Model",
      "Data Object Model",
      "Digital Object Model",
      "Dynamic Object Model",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does the 'NaN' in JavaScript stand for?",
    answers: [
      "Not a Node",
      "No access Notification",
      "Not a Number",
      "Nonetheless a Null",
    ],
    correctAnswer: 2,
  },
  {
    question: "How do you comment a single line of code in JavaScript?",
    answers: [
      "// This is a comment",
      "' This is a comment",
      "# This is a comment",
      "/* This is a comment */",
    ],
    correctAnswer: 0,
  },
];
