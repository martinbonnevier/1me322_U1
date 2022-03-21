// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt

// Word that is to be guessed by player.
let selectedWord;
// Boxes corresponding to number of letters in word.
let letterBoxes;
// Current hangman image.
let hangmanImg;
// Counter for showing correvt hang man image and check if number of rounds is exceeded.
let hangmanImgNr;
// HTML-element for showing message to player.
let msgElem;
// HTML start button.
let startButton;
// Array containing buttons for all letters of swedish alphabet.
let letterButtons;
// Date object for storing start time.
let startTime;

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  hangmanImg = document.getElementById("hangman");
  msgElem = document.getElementById("message");
  startButton = document.getElementById("startGameBtn");
  startButton.addEventListener("click", startGame);
  startButton.disabled = false;
  letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");

  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].onclick = guessLetter;
    letterButtons[i].disabled = true;
  }

} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------

// Setting up game. 
function startGame() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }
  startButton.disabled = true;
  selectedWord = randomWord();

  showLetterBoxes();
  hangmanImg.src = "img/h0.png";
  hangmanImgNr = 0;
  msgElem.innerHTML = "";
  // Date object
  let now = new Date();
  startTime = now.getTime();
}

// Check if letter is in word. 
function guessLetter() {
  this.disabled = true;
  // Boolean value. Changes to true if word contains guessed letter.
  let letterFound = false;
  // Current guessed letter.
  let letter = this.value


  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord.charAt(i) === letter) {
      letterBoxes[i].innerHTML = letter;
      letterFound = true;
    }
  }

  if (letterFound === false) {
    hangmanImgNr++;
    hangmanImg.src = "img/h" + hangmanImgNr + ".png";
    if (hangmanImgNr === 6) {
      endGame(true);
    }
  }
  let correctLettersCount = 0;
  for (let i = 0; i < selectedWord.length; i++) {
    if (letterBoxes[i].innerHTML !== "&nbsp;") {
      correctLettersCount++;
    }

  }
  if (correctLettersCount === selectedWord.length) {
    endGame(false);
  }
}

// Get random word from array of words. 
function randomWord() {
  let oldWord = selectedWord;
  while(oldWord === selectedWord){
    let random = Math.floor(Math.random() * wordList.length);
    return wordList[random];
  }
  

}

// Set correct number of letter boxes.
function showLetterBoxes() {
  let newCode = "";
  let letterCount = selectedWord.length;
  for (let i = 0; i < letterCount; i++) {
    newCode += "<span>&nbsp;</span>"
  }
  document.getElementById("letterBoxes").innerHTML = newCode;
  letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
}

// Show winner/looser message and time of game.
function endGame(IsEnded) {
  startButton.innerHTML = "Starta nytt spel."
  startButton.disabled = false;

  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }

  if (IsEnded === true) {
    msgElem.innerHTML = "Tyvärr, gubben hängdes. Rätt ord är: " + selectedWord;
  }
  if (IsEnded === false) {
    msgElem.innerHTML = "Grattis! Du kom fram till rätt ord.";
  }
  let endTime = (new Date().getTime() - startTime)/1000;
  msgElem.innerHTML += "</br>Det tog " + endTime.toFixed(1) + " sekunder."

}