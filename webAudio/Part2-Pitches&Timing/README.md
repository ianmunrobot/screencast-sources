# Web Audio - dealing with musical pitch and timing

Let's talk briefly about the relationship between `frequency` - an absolute measurement of vibration, and `pitch` - a more perceptive/musical phenomenon. If we want to be able to describe melodies in musical terms we might be more familiar with such as note names, we'll need to be able to convert between these two measurement systems.

[More info about the relationship between these terms](http://www.physicsclassroom.com/class/sound/Lesson-2/Pitch-and-Frequency)

## Pitches & Octaves

![piano keyboard](https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Octave_Designations_4.svg/1280px-Octave_Designations_4.svg.png)

A typical piano has 88 keys, labeled by pitch name and octave designation above. For the non-musician, octaves can be thought of as the total range of a single scale (think do-re-mi-fa-sol-la-ti-do). The relationship between `frequency`, which the Web Audio API uses to output oscillator sound, and musical `pitch`, as we humans recognize it, can be a bit confusing. It all comes down to ratios:

Rising in pitch by one octave results in the frequency (measured in cycles per second or Hertz (Hz)) doubling. So if the pitch `A4` is vibrating at `440 Hz`, rising by one octave would result in `880Hz`, and dropping by one octave would be `220Hz`. To human ears, these distances sound the same because our pitch perception is logarithmic, not linear.

In Western music, we most often use a system of tuning called Equal Temperament, meaning that individual half-steps or semitones (think going up from one key to the next adjacent key) is 1/12 of the distance between one octave and the next. We base these relationships on one central tuning note - the most common is considering `A5` on the keyboard to be `440Hz` and making all calculations from there. In this repo, we have a couple functions helping us get these calculations correctly. We generally refer to this tone an tuning system as `A440`

```js
var frequencyFromKeyNum = function(keyNum) {
  return Math.pow(Math.pow(2, (1 / 12)), keyNum - 49) * 440
}
```

This function takes a key number derived from the piano key numbers and performs the necessary calculation in order to derive an equally-tempered frequency. We offset from 49 because `A440` is the 49th key of the piano. You can find more information about this calculation [here](https://en.wikipedia.org/wiki/Piano_key_frequencies).

## Pitch names

In order to find a key number from a pitch number, we use a helpful dictionary and converter function.

```js
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
  var pitchMatchRegEx = /([A-Ga-g]+#{0,1})(\d)/;
  var pitchNameParts = keyName.match(pitchMatchRegEx);
  if (!pitchNameParts) {
    throw new Error('Incorrect pitch notation. Pitchname must consist of a pitch name (A-G) with optional sharp(#) or flat (b) symbol and octave designation (0-8)')
  }
  var pitchName = pitchNameParts[1].toUpperCase();
  var octave = parseInt(pitchNameParts[2]);
  var keyNumber = (octave * 12) + pitchOffsets[pitchName] + 1
  return keyNumber;
}
```

You can see a bit more about what how that [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) is working [here](https://regexper.com/#%2F(%5BA-Ga-g%5D%2B%23%7B0%2C1%7D)(%5Cd)%2F).

We take a pitch name and calculate its key number by multiplying its octave base `(octave * 12)` and adding an offset, or number of semitones up from `A` in that octave

By composing these two functions, we can return a frequency value for any pitch name:

```js
frequencyFromKeyNum(keyNumFromName('A5')) // => 440
```

