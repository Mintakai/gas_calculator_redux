function jCalculate() {

  // Get user input values from form.
  var distance = document.getElementsByName("iDistance")[0].value;
  var speed1 = document.getElementsByName("iSpeed1")[0].value;
  var speed2 = document.getElementsByName("iSpeed2")[0].value;
  var car = document.getElementsByName("iCars")[0];
  var selectedCar = car.options[car.selectedIndex].value;
  var selectedCarMake = car.options[car.selectedIndex].innerText;

  // Get validate results and assign them into variables.
  var dstValidate = validate(distance);
  var spd1Validate = validate(speed1);
  var spd2Validate = validate(speed2);

  // Check the validate results and set "err" class onto an element if validation wasn't passed...
  if(dstValidate != true || spd1Validate != true || spd2Validate != true){
    document.getElementById("resultBox").innerText = "There was a problem with your input.\nAccepted symbols: 0-9 and . or ,";
    if(dstValidate != true){
      var distanceElement = document.getElementsByName("iDistance")[0]
      distanceElement.classList.add("err");
    }
    if(spd1Validate != true){
      var speed1Element = document.getElementsByName("iSpeed1")[0]
      speed1Element.classList.add("err");
    }
    if(spd2Validate != true){
      var speed2Element = document.getElementsByName("iSpeed2")[0]
      speed2Element.classList.add("err");
    }
  }
  // ...otherwise proceed with calculations.
  else {

    // If comma is used instead of dot, convert to dot.
    if (distance.includes(",") || speed1.includes(",") || speed2.includes(",")){
      var distance = convertComma(distance)
      var speed1 = convertComma(speed1)
      var speed2 = convertComma(speed2)
    }

    // Assign calculation results into variables.
    var consumption1 = calcConsumption(speed1, selectedCar);
    var usedGas1 = calcUsedGas(consumption1, distance);
    var timeUsed1 = calcUsedTime(speed1, distance);
  
    var consumption2 = calcConsumption(speed2, selectedCar);
    var usedGas2 = calcUsedGas(consumption2, distance);
    var timeUsed2 = calcUsedTime(speed2, distance);
    
    // Draw results to result modal.
    document.getElementById("resultBox").innerText = "Distance: " + distance + "km\n" + selectedCarMake;
    document.getElementById("resultBox1").innerText = "Speed: " + speed1 + "\nConsumption: " + consumption1 + "l/100km\nUsed Gas: " + usedGas1 + "l\nUsed time: " + timeUsed1;
    document.getElementById("resultBox2").innerText = "Speed: " + speed2 + "\nConsumption: " + consumption2 + "l/100km\nUsed Gas: " + usedGas2 + "l\nUsed time: " + timeUsed2;
  }
}

// Check string so that it matches.
function validate(string) {
  const rgx = new RegExp('^[0-9]+(\.|,)?[0-9]+$');
  console.log(rgx.test(string));
  return rgx.test(string);
}

// Convert comma to dot.
function convertComma(string) {
  return string.replace(",", ".")
}

function calcConsumption(speed, consumption){
  return (consumption * Math.pow(1.009, speed)).toFixed(2);
}

function calcUsedGas(consumption, distance){
  return ((consumption * distance) / 100).toFixed(2);
}

function calcUsedTime(speed, distance){
  var time = (distance / speed) * 60;
  var hours = Math.floor(time / 60);
  var minutes = Math.round(time % 60);
  return hours + "h " + minutes + "m"
}

$( document ).ready(function() {

  // Assign elements into variables
  var btn = document.getElementsByClassName("formButton")[0];
  var instr = document.getElementById("instruction");

  var instrModal = document.getElementById("instructionModal");
  var modal = document.getElementById("resultModal");
  var btn = document.getElementsByClassName("formButton")[0];
  var iSpan = document.getElementById("instructionClose");
  var span = document.getElementById("close");

  var resultBoxText = document.getElementById("resultBox").innerText;
  var resultBox1Text = document.getElementById("resultBox1").innerText;
  var resultBox2Text = document.getElementById("resultBox2").innerText;

  // When "instruction" span is clicked -> show instruction Modal.
  instr.onclick = function() {
    $('#instructionModal').show();
  }

  // When "formButton" button is clicked -> show result Modal.
  // Also run jCalculate() function, that calculates results from user input and draw them onto the result Modal.
  btn.onclick = function() {
    $('#resultModal').show();
    jCalculate();
  }

  // When "instructionClose" span is clicked (x on the instruction modal) -> set instruction Modal display to none (hide modal).
  iSpan.onclick = function() {
    instrModal.style.display = "none";
  }

  // When "close" span is clickeddd (x on the result modal) -> set result Modal display to none (hide modal).
  span.onclick = function() {
    modal.style.display = "none";
    resultBoxText = "";
    resultBox1Text = "";
    resultBox2Text = "";
  }

  // When either modal (instruction or result) is open and surrounding area is clicked -> set modal display to none (hide modal).
  window.onclick = function(event) {
    if (event.target == modal || event.target == instrModal) {
      modal.style.display = "none";
      instrModal.style.display = "none";
    }
  }

  // When any of the "formInput" fields is clicked (or gains focus in any other way) -> remove class "err" from element.
  // "err" class is added to an element in jCalculate() function, on rows: 13-27
  document.querySelectorAll('.formInput').forEach(item => {
    item.addEventListener('focus', event => {
      item.classList.remove("err");
    })
  })
});