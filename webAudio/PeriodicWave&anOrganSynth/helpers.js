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