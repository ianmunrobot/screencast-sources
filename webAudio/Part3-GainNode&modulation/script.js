var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var gain = audioCtx.createGain();
gain.gain.value = 0.5;
gain.connect(audioCtx.destination);

var lfoGain = audioCtx.createGain();
lfoGain.gain.value = 0.5;
lfoGain.connect(gain);

var osc = audioCtx.createOscillator();
osc.type = 'square';
osc.frequency.value = 220;
osc.connect(lfoGain);
osc.start();

var lfo = audioCtx.createOscillator();
lfo.type = 'sine';
lfo.frequency.value = 5;
lfo.connect(lfoGain.gain);
lfo.start();

var frequencySlider = document.getElementById('frequency');
frequencySlider.oninput = function(event) {
  var newFreq = event.target.value;
  osc.frequency.value = newFreq;
}

var gainSlider = document.getElementById('gain');
gainSlider.oninput = function(event) {
  var newGain = event.target.value;
  gain.gain.value = newGain;
}

var lfoFrequencySlider = document.getElementById('lfo');
lfoFrequencySlider.oninput = function(event) {
  var newFreq = event.target.value;
  lfo.frequency.value = newFreq;
}


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