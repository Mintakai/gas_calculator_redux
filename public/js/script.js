function jCalculate() {
  var distance = document.getElementsByName("iDistance")[0].value;
  var speed1 = document.getElementsByName("iSpeed1")[0].value;
  var speed2 = document.getElementsByName("iSpeed2")[0].value;
  var car = document.getElementsByName("iCars")[0];
  var selectedCar = car.options[car.selectedIndex].value;
  var selectedCarMake = car.options[car.selectedIndex].innerText;

  var dstValidate = validate(distance);
  var spd1Validate = validate(speed1);
  var spd2Validate = validate(speed2);

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
  else {
    var consumption1 = calcConsumption(speed1, selectedCar);
    var usedGas1 = calcUsedGas(consumption1, distance);
    var timeUsed1 = calcUsedTime(speed1, distance);
  
    var consumption2 = calcConsumption(speed2, selectedCar);
    var usedGas2 = calcUsedGas(consumption2, distance);
    var timeUsed2 = calcUsedTime(speed2, distance);
    
    document.getElementById("resultBox").innerText = "Distance: " + distance + "km\n" + selectedCarMake;
    document.getElementById("resultBox1").innerText = "Speed: " + speed1 + "\nConsumption: " + consumption1 + "l/100km\nUsed Gas: " + usedGas1 + "l\nUsed time: " + timeUsed1;
    document.getElementById("resultBox2").innerText = "Speed: " + speed2 + "\nConsumption: " + consumption2 + "l/100km\nUsed Gas: " + usedGas2 + "l\nUsed time: " + timeUsed2;
  }
}

function validate(string) {
  const rgx = new RegExp('^[0-9]+(\.|,)?[0-9]+$');
  console.log(rgx.test(string));
  return rgx.test(string);
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
  alert("TODO\n\n\nTRY/CATCH\n\nCOMMENTS\n\nDEPLOY TO HEROKU")

  var btn = document.getElementsByClassName("formButton")[0];
  var instr = document.getElementById("instruction");

  var instrModal = document.getElementById("instructionModal");
  var modal = document.getElementById("resultModal");
  var btn = document.getElementsByClassName("formButton")[0];
  var iSpan = document.getElementById("instructionClose");
  var span = document.getElementById("close");

  instr.onclick = function() {
    $('#instructionModal').show();
  }

  btn.onclick = function() {
    $('#resultModal').show();
    jCalculate();
  }

  iSpan.onclick = function() {
    instrModal.style.display = "none";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal || event.target == instrModal) {
      modal.style.display = "none";
      instrModal.style.display = "none";
    }
  }

  document.querySelectorAll('.formInput').forEach(item => {
    item.addEventListener('focus', event => {
      item.classList.remove("err");
    })
  })
});