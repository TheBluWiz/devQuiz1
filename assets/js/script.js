// State Variables
var timeRemaining = 0;
var currentQuestion = 0;
var userAnswer = "";
var quizStarted = false;
var score = 0;
var userInitials = "";
var highScore = [];
if (JSON.parse(localStorage.getItem("highScore")) !== null) {
  highScore = JSON.parse(localStorage.getItem("highScore"));
}
console.log(highScore);

// UI Hooks
var timeRemainingEl = document.querySelector("#time-remaining");
timeRemainingEl.textContent = timeRemaining;

var startButtonEl = document.querySelector("#start-button");
var buttonsEl = document.querySelector("#buttons");
var questionEl = document.querySelector("#question");
var isCorrectEl = document.querySelector("#is-correct");
var bodyEl = document.querySelector("#test");
var finalScoreEl = document.querySelector("#final-score");
var gameOverEl = document.querySelector("#game-over");
var submitScoreEl = document.querySelector("#submit-score");
var initialsEl = document.querySelector("#initials");

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
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debuggger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  },
  {
    question: "Which of the following is a version control system?",
    answers: ["rsync", "Git Bash", "stack overflow", "git"],
    correctAnswer: "git"
  },
  {
    question: "What commonly used file prevents unwanted code from being included in your repo?",
    answers: [".gitignore", "git.ignore", ".gitIgnore", ".ignoregit"],
    correctAnswer: ".gitignore"
  },
  {
    question: "Which file is the first resource pulled when accessing a website?",
    answers: ["root.html", "styles.css", "html.index", "index.html"],
    correctAnswer: "index.html"
  },
  {
    question: "Which of the following tools helps make websites responsive?",
    answers: ["transform", "@media", "font-weight", "<div>"],
    correctAnswer: "@media"
  },
  {
    question: "How do you add an image to a README.md file?",
    answers: ['<img src="./file/path>"', '<link href="./file/path"', "![site image](./file/path)", '"!<img>(./file/path"']
  }
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
  if (currentQuestion < questionsArray.length) {
    assignQuestion();
    deleteButtons();
    createButtons();
  }
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
    isCorrectEl.textContent = "Correct!";
    score++;
  } else {
    isCorrectEl.textContent = "Incorrect!";
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
  console.log(score)
  nextQuestion();
});

timerInterval = setInterval(function () {
  if (quizStarted) {
    if (timeRemaining > 0 && currentQuestion < questionsArray.length) {
      timeRemaining--;
      timeRemainingEl.textContent = timeRemaining;
    } else {
      finalScoreEl.textContent = score;
      bodyEl.setAttribute("style", "display:none");
      gameOverEl.setAttribute("style", "display:flex; flex-direction:column; align-items: center;");
      quizStarted = false;
    }
  }
}, 1000);

submitScoreEl.addEventListener("click", function (event) {
  event.preventDefault();
  userInitials = initialsEl.value;
  score =
  {
    userInitials: userInitials,
    score: score,
    timeRemaining: timeRemaining
  };
  highScore.push(score)
  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location.replace("./highscore.html")
});