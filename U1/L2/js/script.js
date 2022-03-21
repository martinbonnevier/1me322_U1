// Globala variabler
var input1Elem, input2Elem, msgElem, url, selFruitsElem, selFruitNr;

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  // Input from field 1
  input1Elem = document.getElementById("input1");
  // Input from field 2
  input2Elem = document.getElementById("input2");
  // Message section
  msgElem = document.getElementById("message");
  // First button
  var button1 = document.getElementById("btn1");
  // selectedFruits element
  selFruitsElem = document.getElementById("selectedFruits");
  button1.addEventListener("click", showFruits);
  var button2 = document.getElementById("btn2");
  button2.addEventListener("click", addFruits);
  selFruitNr = 0;

} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------

// Show the fruit choosen by user. 
function showFruits() {
  // User inputted nr
  let nr = checkNr(input1Elem.value, 5);
  if (nr === null) {
    return
  }
  // Highest nr = 5
  let high = 5;
  input1Elem.value = nr;
  document.getElementById("fruitImg").src = getUrl(nr, high);
  selFruitNr = nr;

}

// Add fruits to imgList
function addFruits() {
  let amount = checkNr(input2Elem.value, 9);
  if (amount === null) {
    return
  }
  if (selFruitNr === null) {
    return
  }
  let fruitUrl = getUrl(selFruitNr);
  let imgList = "";
  for (let i = 0; i < amount; i++) {
    imgList += "<img src = '" + fruitUrl + "' alt='frukt'>";
  }
  selFruitsElem.innerHTML += imgList;
}

// Get img url from user input
function getUrl(nr) {
  switch (nr) {
    case 1: url = "/img/apple.png"; break;
    case 2: url = "/img/banana.png"; break;
    case 3: url = "/img/orange.png"; break;
    case 4: url = "/img/pear.png"; break;
    case 5: url = "/img/pineapple.png"; break;
    default: url = "/img/nofruit.png"; break;
  }
  return url;
}

// Check that user input is a number and between 1 and "high".
function checkNr(nr, high) {
  msgElem.innerHTML = "";
  if (isNaN(nr)) {
    msgElem.innerHTML = "Du måste skriva ett tal med siffror";
    return null;
  }
  if (nr < 1 || nr > high) {
    msgElem.innerHTML = "Du måste skriva ett tal mellan 1 och 5";
    return null;
  }
  return parseInt(nr);
}
