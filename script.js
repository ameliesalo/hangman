const words = ["elephant", "tiger", "zebra"];

let word = words[Math.floor(Math.random() * words.length)];

let lettersLeft = word.length;
let wrongGuess = 0;

// Answer with underscores:
let answerUnderscores = [];
for (let i = 0; i < word.length; i++) {
    answerUnderscores[i] = "_";
}
document.getElementById("answer").innerHTML = answerUnderscores.join(" ");


// Game loop:

