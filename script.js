const words = ["elephant", "tiger", "zebra"];

let word;
let lettersLeft;
let wrongGuess = 0; //av 4
let wrongGuesses = []; // Tom array för alla felgissningar
let correctGuesses = [];
let guessLetter;
const playingboardElements = document.querySelectorAll("#playingboard > *");
const startGameButton = document.getElementById("startgame");
const resetGameButton = document.getElementById("resetgame");
const wrongGuessesBox = document.getElementById("wrongletters");
const bodyParts = document.querySelectorAll("[data-name=body");

const startGame = () => {
  word = words[Math.floor(Math.random() * words.length)];
  lettersLeft = word.length;

  playingboardElements.forEach((playingboardElement) => {
    playingboardElement.classList.toggle("hidden");
  });

  drawWord();
};

const resetGame = () => {
  word = "";
  wrongGuess = 0;
  wrongGuesses = [];
  answerUnderscores = [];
  wrongGuesses = [];

  drawWord();

  playingboardElements.forEach((playingboardElement) => {
    playingboardElement.classList.toggle("hidden");
  });
  bodyParts.forEach((bodyPart) => {
    bodyPart.classList = "hidden";
  });
};

startGameButton.addEventListener("click", startGame);
resetGameButton.addEventListener("click", resetGame);

// Answer with underscores:
let answerUnderscores = [];
const drawWord = () => {
  for (let i = 0; i < word.length; i++) {
    answerUnderscores[i] = "<p></p>";
  }
  if (answerUnderscores.length == 0) {
    document.getElementById("answer").innerHTML = answerUnderscores;
  } else {
    document.getElementById("answer").innerHTML = answerUnderscores.join("");
  }
};

// Guess a letter function
let guessButton = document.getElementById("guess");

const guessLetterInput = () => {
  guessLetter = document.getElementById("guessLetter").value;

  if (
    !answerUnderscores.includes(`<p>${guessLetter}</p>`) &&
    !wrongGuesses.includes(guessLetter)
  ) {
    if (word.includes(guessLetter)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guessLetter) {
          answerUnderscores.splice(i, 1, `<p>${guessLetter}</p>`);
          correctGuesses.push(guessLetter);
        }
      }
      document.getElementById("answer").innerHTML = answerUnderscores.join(" ");
    } else {
      wrongGuess++;
      wrongGuesses.push(guessLetter);
      wrongGuessesBox.innerHTML = wrongGuesses.join(", ");
      switch (wrongGuess) {
        case 1:
          document.getElementById("head").classList = "";
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

  if (wrongGuess == 4) {
    alert("Du förlorade");
  }

  if (word.length == correctGuesses.length) {
    alert("Du vann");
  }

  document.getElementById("guessLetter").value = "";
};
guessButton.addEventListener("click", guessLetterInput);
