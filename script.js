const words = ["elephant", "tiger", "zebra"];

let word;
let wrongGuesses = [];
let correctGuesses = [];
let guessLetter;
let answer = [];
const guessButton = document.getElementById("guess");
const playingboardElements = document.querySelectorAll("#playingboard > *");
const startGameButton = document.getElementById("startgame");
const resetGameButtons = document.querySelectorAll("[data-function=resetgame]");
const wrongGuessesBox = document.getElementById("wrongguesses");
const wrongLettersBox = document.getElementById("wrongletters");
const guessLetterField = document.getElementById("guessLetter");
const bodyParts = document.querySelectorAll("[data-name=body");
const winBox = document.getElementById("win");
const loseBox = document.getElementById("lose");
const answerBox = document.getElementById("answer");

const startGame = () => {
  word = words[Math.floor(Math.random() * words.length)];

  playingboardElements.forEach((playingboardElement) => {
    playingboardElement.classList.toggle("hidden");
  });
  guessLetterField.disabled = false;
  guessButton.disabled = false;

  drawWord();
  guessLetterField.focus();
};

const resetGame = () => {
  word = "";
  answer = [];
  correctGuesses = [];
  wrongGuesses = [];

  drawWord();

  playingboardElements.forEach((playingboardElement) => {
    playingboardElement.classList.toggle("hidden");
  });
  bodyParts.forEach((bodyPart) => {
    bodyPart.classList = "hidden";
  });
  wrongGuessesBox.classList = "hidden";
  winBox.classList = "hidden";
  loseBox.classList = "hidden";
};

// Answer with underscores:
const drawWord = () => {
  for (let i = 0; i < word.length; i++) {
    answer[i] = "<p></p>";
  }
  if (answer.length == 0) {
    answerBox.innerHTML = answer;
  } else {
    answerBox.innerHTML = answer.join("");
  }
};

// Guess a letter function
const guessLetterInput = () => {
  guessLetter = document.getElementById("guessLetter").value.toLowerCase();

  if (
    !answer.includes(`<p>${guessLetter}</p>`) &&
    !wrongGuesses.includes(guessLetter)
  ) {
    if (word.includes(guessLetter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guessLetter) {
          answer.splice(i, 1, `<p>${guessLetter}</p>`);
          correctGuesses.push(guessLetter);
        }
      }
      answerBox.innerHTML = answer.join(" ");
    } else {
      wrongGuesses.push(guessLetter);
      wrongLettersBox.innerHTML = wrongGuesses.join(", ");
      switch (wrongGuesses.length) {
        case 1:
          document.getElementById("head").classList = "";
          wrongGuessesBox.classList = "";
          break;
        case 2:
          document.getElementById("body").classList = "";
          break;
        case 3:
          document.getElementById("arms").classList = "";
          break;
        case 4:
          document.getElementById("legs").classList = "";
          break;
      }
    }
  } else {
    alert(`Du har redan gissat ${guessLetter}`);
  }

  if (wrongGuesses.length == 4) {
    loseBox.classList = "win-lose";
    guessLetterField.disabled = true;
    guessButton.disabled = true;
  }

  if (word.length == correctGuesses.length) {
    winBox.classList = "win-lose";
    guessLetterField.disabled = true;
    guessButton.disabled = true;
  }

  document.getElementById("guessLetter").value = "";
  guessLetterField.focus();
};

guessButton.addEventListener("click", guessLetterInput);
startGameButton.addEventListener("click", startGame);
resetGameButtons.forEach((resetGameButton) => {
  resetGameButton.addEventListener("click", resetGame);
});
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    guessLetterInput();
  }
});
