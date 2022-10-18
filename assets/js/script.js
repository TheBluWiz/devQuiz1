var timeRemaining = 0;
var currentQuestion = 0;
var userAnswer = "";
var quizStarted = false;
var score = 0;
var userName = "";

var timeRemainingEl = document.querySelector("#time-remaining");
timeRemainingEl.textContent = timeRemaining;

var startButtonEl = document.querySelector("#start-button");
var buttonsEl = document.querySelector("#buttons");
var questionEl = document.querySelector("#question");
var isCorrect = document.querySelector("#is-correct");

// Seeds Questions and answers for website
const questionsArray = [
  {
    question: "Commonly used data types DO NOT include",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question: "The condition of an if/else statement is enclosed within _____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of these"],
    correctAnswer: "all of these"
  },
]
// Fischer-Yates shuffle sourced at:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function scrambleQuestions() {
  for (let i = questionsArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
  }
}
scrambleQuestions();

function assignQuestion() {
  questionEl.textContent = questionsArray[currentQuestion].question;
}

function createButtons() {
  for (let i = 0; i < questionsArray[currentQuestion].answers.length; i++) {
    var buttonArray = document.createElement("button");
    buttonArray.textContent = questionsArray[currentQuestion].answers[i]
    buttonsEl.appendChild(buttonArray);
  }
}

function deleteButtons() {
  while (buttonsEl.firstChild) {
    buttonsEl.removeChild(buttonsEl.firstChild);
  }
}

function nextQuestion() {
  currentQuestion++;
  assignQuestion();
  deleteButtons();
  createButtons();
}

function answerIsCorrect() {
  if (userAnswer === questionsArray[currentQuestion].correctAnswer) {
    userAnswer = true;
  } else {
    userAnswer = false;
  }
}

function updateResult() {
  if (userAnswer === true) {
    isCorrect.textContent = "Correct!";
    score++;
  } else {
    isCorrect.textContent = "Incorrect!";
    timeRemaining -= 10;
    timeRemainingEl.textContent = timeRemaining;
  }
}

// function toggleTest() {
//   if (startButtonEl.getAttribute("style") === "display:inline-block") {
//     startButtonEl.setAttribute("style", "display:none");
//   } else {
//     startButtonEl.setAttribute("style", "display:inline-block");
//   }
//   if (buttonsEl.getAttribute("style") === "display:none") {
//     buttonsEl.setAttribute("style", "display:flex");
//   } else {
//     buttonsEl.setAttribute("style", "display:none");
//   }
// }

startButtonEl.addEventListener("click", function () {
  startButtonEl.setAttribute("style", "display:none");
  assignQuestion();
  createButtons();
  buttonsEl.setAttribute("style", "display:flex");
  timeRemaining = 90;
  timeRemainingEl.textContent = timeRemaining;
  quizStarted = true;
});

buttonsEl.addEventListener("click", function (event) {
  event.stopPropagation();
  userAnswer = event.target.textContent
  answerIsCorrect();
  updateResult();
  nextQuestion();
});

console.log(currentQuestion)
console.log (questionsArray.length)
console.log(currentQuestion < questionsArray.length)
timerInterval = setInterval(function () {
  if (quizStarted) {
    console.log(timeRemaining)
    console.log(timeRemaining > 0) 
    if (timeRemaining > 0 && currentQuestion < questionsArray.length) {
      timeRemaining--;
      timeRemainingEl.textContent = timeRemaining;
    } else {
      deleteButtons();
      questionEl.textContent = "";
      isCorrect.setAttribute("style", "display:none")
      alert("Game Over");
      userName = prompt("What is your name?");
      quizStarted = false;
    }
  }
}, 1000);
//alert Game Over
//prompt What is your name?
//add score to Highscore list