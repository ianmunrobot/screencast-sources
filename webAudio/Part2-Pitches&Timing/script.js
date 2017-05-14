var pitchOffsets = {
  'A': 0,
  'A#': 1,
  'BB': 1,
  'B': 2,
  'CB': 2,
  'B#': 3,
  'C': 3,
  'C#': 4,
  'DB': 4,
  'D': 5,
  'D#': 6,
  'EB': 6,
  'E': 7,
  'FB': 7,
  'E#': 8,
  'F': 8,
  'F#': 9,
  'GB': 9,
  'G': 10,
  'G#': 11,
  'AB': 11
}

var keyNumFromName = function(keyName) {
  // match a pitch name and octave, capture them separately
  // Breakdown of this regex here: https://regexper.com/#%2F(%5BA-Ga-g%5D%2B%23%7B0%2C1%7D)(%5Cd)%2F
  var pitchMatchRegEx = /([A-Ga-g]+#{0,1})(\d)/;
  var pitchNameParts = keyName.match(pitchMatchRegEx);
  if (!pitchNameParts) {
    throw new Error('Incorrect pitch notation. Pitchname must consist of a pitch name (A-G with optional # or b) and ')
  }
  var pitchName = pitchNameParts[1].toUpperCase();
  var octave = parseInt(pitchNameParts[2]);
  var keyNumber = (octave * 12) + pitchOffsets[pitchName] + 1
  return keyNumber;
}

var frequencyFromKeyNum = function(keyNum) {
  return Math.pow(Math.pow(2, (1 / 12)), keyNum - 49) * 440
}

var audioCtx = (window.AudioContext || window.webkitAudioContext)();

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