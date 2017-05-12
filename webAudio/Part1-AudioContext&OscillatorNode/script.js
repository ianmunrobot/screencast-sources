// Set up a new 'Audio Context'. All audio nodes must be created within this context
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// all of the node creation methods are on the returned context instance
// We do some defensive programming so that we can run audioContext on webkit and non-webkit browsers
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// This will create an instance of OscillatorNode
var osc = audioCtx.createOscillator();
// To use it, we should set its properties:
// waveshape: triangle wave
// https://en.wikipedia.org/wiki/Triangle_wave
osc.type = 'triangle';
// frequency (in Hz):
osc.frequency.value = 200;
// we must connect its output to the context output
osc.connect(audioCtx.destination);
osc.start();

// create start/stop button handlers
var startAudio = document.getElementById('audioStart');
var endAudio = document.getElementById('audioEnd');

startAudio.onclick = function() {
  audioCtx.resume();
}

endAudio.onclick = function() {
  audioCtx.suspend();
}

// set up a couple simple randomizers
var interval;
function startRandom () {
  interval = window.setInterval(function() {
    var newFrequency = Math.random() * 400 + 200;
    console.log('new frequency:', newFrequency);
    osc.frequency.value = newFrequency;
  }, 400);
}

function stopRandom() {
  window.clearInterval(interval);
}

// create click handlers for randomizers
var startRandomButton = document.getElementById('startRandomFrequency');
startRandomButton.onclick = startRandom;
var stopRandomButton = document.getElementById('endRandomFrequency');
stopRandomButton.onclick = stopRandom;
