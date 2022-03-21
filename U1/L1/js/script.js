var inputlElem, input2Elem, resultElem; 

function init(){
  button = document.getElementById("runBtn");
  button.addEventListener("click", areaCalculations);
}
window.onload = init;

function areaCalculations() { 
  var length;
  var width; 
  length = Number(document.getElementById("input1").value);
  width = Number(document.getElementById("input2").value);
  console.log(length + " " + width)
  console.log("oppp");

  resultElem = document.getElementById("result");
  resultElem.innerHTML = "Area för rektangeln: " + length * width + " m<sup>2</sup></br>" 
  resultElem.innerHTML += "Area för ellipsen: " + (Math.PI * length * width)/4 + " m<sup>2</sup></br>"
  resultElem.innerHTML += "Längden + 5 ger rektangelns area: " + (length + 5)*width + " m<sup>2</sup></br>"
  resultElem.innerHTML += "Då längden ökas med 50% och bredden med 3 meter blir rektangelns area: " + (length*1.5)*(width+3) +" m<sup>2</sup></br>"
  resultElem.innerHTML += "Triangelns area: " + ((length*3.28)*(width*3.28))/2 + " kvadratfot"
} // End areaCalculations 