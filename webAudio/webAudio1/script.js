// Set up a new 'Audio Context'. All audio nodes must be created within this context
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// all of the node creation methods are on the returned context instance
var audioCtx = new window.AudioContext();


var osc = audioCtx.createOscillator();
