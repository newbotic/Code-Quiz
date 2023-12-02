var x = document.getElementById('start');
// x.addEventListener('click', timerFunction);
// add event listener

x.addEventListener('click', quizFunction);

function quizFunction() {
    alert('quiz start');
  }


  var questions = [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      answers: [
        "var x = 5;",
        "variable x = 5;",
        "x = 5;",
        "int x = 5;"
      ],
      correctAnswer: "var x = 5;"
    },
    {
      question: "Which operator is used for strict equality in JavaScript?",
      answers: ["==", "===", "=", "!="],
      correctAnswer: "==="
    },
    {
      question: "What does the 'DOM' stand for?",
      answers: [
        "Document Object Model",
        "Data Object Model",
        "Digital Object Model",
        "Dynamic Object Model"
      ],
      correctAnswer: "Document Object Model"
    },
    {
        question: "What does the 'NaN' in JavaScript stand for?",
        answers: [
          "Not a Node",
          "No access Notification",
          "Not a Number",
          "Nonetheless a Null"
        ],
        correctAnswer: "Not a Number"
      },
      {
        question: "How do you comment a single line of code in JavaScript?",
        answers: [
          "// This is a comment",
          "' This is a comment",
          "# This is a comment",
          "/* This is a comment */"
        ],
        correctAnswer: "// This is a comment"
      },
  ];
  
  console.log(questions[0].answers);