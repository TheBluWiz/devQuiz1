var highScoreEl = document.querySelector("#high-scores");
var buttonsEl = document.querySelector("#buttons");
console.log(buttonsEl)

var highScore = [];
if (JSON.parse(localStorage.getItem("highScore")) !== null) {
  highScore = JSON.parse(localStorage.getItem("highScore"));
};
console.log(highScore)

for (let i = 0; i < highScore.length; i++) {
  let j = i + 1
  let score = j + ". " + highScore[i].userInitials + " - " + highScore[i].score
  let liEl = document.createElement("li")
  if (j % 2 === 0) {
    liEl.setAttribute("style", "margin-left: 18px; margin-right: auto; background-color: lightblue;width: 100%; right: 18px")
  };
  liEl.textContent = score
  highScoreEl.appendChild(liEl)
}

buttonsEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.textContent === "Go Back") {
    window.location.replace("./index.html")
  }
  if (event.target.textContent === "Clear Highscores") {
    localStorage.removeItem("highScore")
    window.location.replace("./highscore.html")
  }
});