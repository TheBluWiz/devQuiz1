// State Variables
var timeRemaining = 0;
var currentQuestion = 0;
var userAnswer = "";
var quizStarted = false;
var score = 0;
var userName = "";

// UI Hooks
var timeRemainingEl = document.querySelector("#time-remaining");
timeRemainingEl.textContent = timeRemaining;

var startButtonEl = document.querySelector("#start-button");
var buttonsEl = document.querySelector("#buttons");
var questionEl = document.querySelector("#question");
var isCorrect = document.querySelector("#is-correct");
var body = document.querySelector("#test")

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
for (let i = questionsArray.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
}

// sets UI to current question
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

timerInterval = setInterval(function () {
  if (quizStarted) {
    if (timeRemaining > 0 && currentQuestion < questionsArray.length) {
      timeRemaining--;
      timeRemainingEl.textContent = timeRemaining;
    } else {
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      body.setAttribute("styles", "display: flex; flex-direction: column; align-items: flex-start");
      body.innerHTML = '<h1>All Done!</h1>' +
        '<p>Your final score is ' + score + '.</p>' +
        '<form>' +
        '<label for="initials">Enter initials: </label>' +
        '<input type="text" id="initials">' +
        '<input type="submit" value="submit" id="submit">' +
        '</form>';
      quizStarted = false;
    }
  }
}, 1000);

//add score to Highscore list