var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var majorScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4'];
var minorScale = ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4'];

// master scale speed value (in seconds per note)
var scaleSpeed = 0.2;

// grab start/stop buttons
var startAudio = document.getElementById('audioStart');
var endAudio = document.getElementById('audioEnd');

// start audio function
startAudio.onclick = function() {
  audioCtx.resume();
}

// pause audio function
endAudio.onclick = function() {
  audioCtx.suspend();
}

// grab major/minor scale buttons
var majorScaleButton = document.getElementById('majorScale');
var minorScaleButton = document.getElementById('minorScale');

majorScaleButton.onclick = playScale;
minorScaleButton.onclick = playScale;

// event handler for play scale buttons
function playScale(e) {
  // extract the 'name' property from the clicked button
  var scaleType = e.target.name;
  // choose the current scale
  var currentScale = scaleType === 'major' ? majorScale : minorScale;
  // Create oscillator/playtime for each sucessive note in the scale
  for (var i = 0; i < currentScale.length; i++) {
    var freq = frequencyFromKeyNum(keyNumFromName(currentScale[i]));
    playTone(freq, audioCtx.currentTime + (i * scaleSpeed))
  }
}

// Play a tone at a specified frequency for the 'scaleSpeed' length
function playTone(freq, time) {
  var osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.connect(audioCtx.destination);
  osc.frequency.value = freq;
  osc.start(time);
  osc.stop(time + scaleSpeed);
  return osc;
}