const words = [
  "DOG",
  "CAT",
  "COW",
  "HORSE",
  "PIG",
  "SHEEP",
  "CHICKEN",
  "RABBIT",
  "BIRD",
  "FISH",
  "DEER",
  "ELEPHANT",
  "LION",
  "MONKEY",
  "SNAKE",
  "FROG",
  "TURTLE",
  "BEE",
  "ANT",
  "SPIDER"
];

const hangmanImage = document.getElementById("hangman-image");
const wordElement = document.getElementById("word");
const guessesLeftElement = document.getElementById("guesses-count");
const guessedLettersElement = document.getElementById("guessed-letters");
const letterInputElement = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");

let wordToGuess;
let guessedLetters = [];
let guessesLeft = 6;

// Array de imagens do boneco da forca
const hangmanImages = [
  "imagem1.png",
  "imagem2.png",
  "imagem3.png",
  "imagem4.png",
  "imagem5.png",
  "imagem6.png",
  "imagem7.png"
];

function startGame() {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  guessesLeft = 6;
  updateDisplay();
  // Define a imagem inicial do boneco
  hangmanImage.src = hangmanImages[0];
}

function updateDisplay() {
  wordElement.textContent = "";
  for (let i = 0; i < wordToGuess.length; i++) {
    if (guessedLetters.includes(wordToGuess[i])) {
      wordElement.textContent += wordToGuess[i] + " ";
    } else {
      wordElement.textContent += "_ ";
    }
  }
  guessesLeftElement.textContent = guessesLeft;
  guessedLettersElement.textContent = guessedLetters.join(", ");
}

function guessLetter() {
  const letter = letterInputElement.value.toUpperCase();
  if (letter.length !== 1 || !/[A-Z]/.test(letter) || guessedLetters.includes(letter)) {
    return;
  }
  guessedLetters.push(letter);
  if (!wordToGuess.includes(letter)) {
    guessesLeft--;
    // Atualiza a imagem do boneco
    hangmanImage.src = hangmanImages[6 - guessesLeft];
  }
  updateDisplay();
  checkWinOrLose();
  letterInputElement.value = "";
}

function checkWinOrLose() {
  if (guessesLeft === 0) {
    alert(`Você perdeu! A palavra era: ${wordToGuess}`);
    resetButton.style.display = "inline-block";
  } else if (wordElement.textContent.replace(/ /g, "") === wordToGuess) {
    alert(`Você ganhou! A palavra era: ${wordToGuess}`);
    resetButton.style.display = "inline-block";
  }
}

function resetGame() {
  startGame();
  resetButton.style.display = "none";
}

guessButton.addEventListener("click", guessLetter);
resetButton.addEventListener("click", resetGame);

startGame();
