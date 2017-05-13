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
// The values for `osc.type` can be 'sine', 'triangle', 'square', or 'sawtooth'
osc.type = 'triangle';
// starting frequency (in Hz):
osc.frequency.value = 200;
// we must connect its output to the context output - main computer output (speakers, headphone port) by default
osc.connect(audioCtx.destination);
// begin the oscillator
osc.start();

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

// set up a simple pitch randomizers
var interval;
function startRandom () {
  interval = window.setInterval(function() {
    // create a new frequency between 200 and 600
    var newFrequency = Math.random() * 400 + 200;
    console.log('new frequency:', newFrequency);
    osc.frequency.value = newFrequency;
  }, 500);
}

// clear the interval creating new random frequencies
function stopRandom() {
  window.clearInterval(interval);
}

// grab buttons
var startRandomButton = document.getElementById('startRandomFrequency');
var stopRandomButton = document.getElementById('endRandomFrequency');

// assign click handlers for the randomizer buttons
startRandomButton.onclick = startRandom;
stopRandomButton.onclick = stopRandom;
