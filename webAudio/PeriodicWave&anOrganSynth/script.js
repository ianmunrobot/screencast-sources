// Grab all sliders from the DOM and assign click handlers
var sliders = Array.from(document.querySelectorAll('input'));
sliders.forEach(function(slider) {
  slider.oninput = handleSliderChange;
});

// Get all slider values
function getSliderValues() {
  var componentFrequencies = sliders.map(function(slider) {
    return +slider.value;
  });
  // We append this because we don't really do anything with the first value in our PeriodicWave
  componentFrequencies.unshift(0);
  return componentFrequencies;
}

// create a new AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create our main oscillator
var osc = audioCtx.createOscillator();
osc.frequency.value = 200;
osc.connect(audioCtx.destination);
osc.start();

function handleSliderChange() {
  var imag= new Float32Array(getSliderValues());   // sine
  var real = new Float32Array(imag.length); // cosine
  var customWave = audioCtx.createPeriodicWave(real, imag);  // cos,sine
  osc.setPeriodicWave(customWave);
}

var keyDict = {
  '97': 'C3',
  '119': 'C#3',
  '115': 'D3',
  '101': 'D#3',
  '100': 'E3',
  '102': 'F3',
  '116': 'F#3',
  '103': 'G3',
  '121': 'G#3',
  '104': 'A4',
  '117': 'A#4',
  '106': 'B4',
  '107': 'C4',
  '111': 'C#4',
  '108': 'D4',
  '112': 'D#4',
  '59': 'E4'
}

document.onkeypress = function(e) {
  var keyCode = keyDict[e.keyCode]
  if (!keyCode) return;
  osc.frequency.setValueAtTime(frequencyFromKeyNum(keyNumFromName(keyCode)), 0);
}