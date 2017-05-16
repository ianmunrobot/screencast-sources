/**This code is a partial implementation of the first section of
 * Steve Reich's * Piano Phase (1967)
 * Two parallel pitch patterns are played at slightly different tempos
 * Creating a phasing pattern between the two. We only schedule
 * 100 iterations of this phasing pattern due to how the oscillator
 * events are scheduled, but the code could be structured in a way
 * to perform the entire piece with more flexible event scheduling
 * Wikipedia has a great explanation of the structure of this composition
 * https://en.wikipedia.org/wiki/Piano_Phase
*/

// dictionary: pitch distance from the node 'A' i.e. the start of the octave
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

// Meat of the code is below:
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create two panner nodes for audio spatialization.
// leftPanNode is panned mostly left (=0.7, -1.0 would be 'hard left' or only in the left channel)
// rightPanNode is opposite, 1.0 would be 'hard right'
var leftPanNode = audioCtx.createStereoPanner();
leftPanNode.pan.value = -0.7;
leftPanNode.connect(audioCtx.destination);

var rightPanNode = audioCtx.createStereoPanner();
rightPanNode.pan.value = 0.7;
rightPanNode.connect(audioCtx.destination);

// this is the pitch sequence of Piano Phase (transposed down one octave)
var pitchSequence = [ 'E3', 'F#3', 'B4', 'C#4', 'D4', 'F#3', 'E3', 'C#4', 'B4', 'F#3', 'D4', 'C#4' ];

// Create an oscillator to play the desired pitch at the desired time
function playPianoTone(freq, time, length, pan) {
  var osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  if (pan === 'left') {
    osc.connect(leftPanNode);
  } else {
    osc.connect(rightPanNode);
  }

  osc.frequency.value = freq;
  osc.start(audioCtx.currentTime + time);
  osc.stop(audioCtx.currentTime + time + length)
  return osc;
}

// The total time between note events
var noteTime = .2;
// number of iterations of the pitch pattern
var maxRepeats = 100;
// speed ratio between the two 'pianos'
var speedRatio = 1.003

// Schedule the events
for (var repeats = 0; repeats < maxRepeats; repeats++) {
    var currentTime = (repeats * pitchSequence.length) * noteTime
    for (var i = 0; i < pitchSequence.length; i++) {
        var time = i * noteTime + currentTime;
        var freq = frequencyFromKeyNum(keyNumFromName(pitchSequence[i]));
        playPianoTone(freq, time, .1, 'left');
        playPianoTone(freq, time * speedRatio, .1, 'right');
    }
}