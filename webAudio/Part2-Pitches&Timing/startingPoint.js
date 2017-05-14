var convertButton = document.getElementById('convert');
var result = document.getElementById('result');
var pitch = document.getElementById('pitch');

// run conversion and display
convertButton.onclick = function() {
  var text = pitch.value;
  result.innerHTML = frequencyFromKeyNum(keyNumFromName(text)) + ' Hz';
}