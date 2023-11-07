const words = ["elephant", "tiger", "zebra"];

let word = words[Math.floor(Math.random() * words.length)];

let lettersLeft = word.length;
let wrongGuess = 0;

// Answer with underscores:
let answerUnderscores = document.getElementById("answer");
answerUnderscores = [];
for (let i = 0; i < word.length; i++) {
    answerUnderscores[i] = "_";
}


// Game loop:

