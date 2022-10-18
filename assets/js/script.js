var timeRemaining = 0;
var currentQuestion = 0;
var userAnswer = "";

var timeRemainingEl = document.querySelector("#time-remaining");
timeRemainingEl.textContent = timeRemaining;

var startButtonEl = document.querySelector("#start-button");
var buttonsEl = document.querySelector("#buttons");
var questionEl = document.querySelector("#question");

console.log(buttonsEl);


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

-//Fisher-Yates Array sort implementation. Sourced from:
-// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
for (let i = questionsArray.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
}

function assignQuestion() {
  questionEl.textContent = questionsArray[currentQuestion].question;
}

//work on this next
function createButtons() {
  var i = 0
  buttonsEl.forEach(element => {
    element.innerHTML = questionsArray[currentQuestion].answers[i]
  });
}

startButtonEl.addEventListener("click", function () {
  startButtonEl.setAttribute("style", "display:none");

  assignQuestion();
  createButtons();
  currentQuestion++;
});



//how to set var in place of question1
// console.log(questions.question1.correctAnswer)
// Start quiz
//replaceQuestion()
  //replace main p with question
  //remove all buttons in main
  //select question at random
  //for each answer in question, create button

// while timer > 0
//decrease timer every second

//on button press
//set button text to playerAnswer
  //playerAnswer= if (playerAnswer === quesions.$[randomquesion].correctAnswer)
   // if yes increase score
    //if no decrease time
  //if timer > 0
    //replaceQuestion()

//alert Game Over
//prompt What is your name?
//add score to Highscore list