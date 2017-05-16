## Piano Phase

Screencast: https://scrimba.com/casts/cast-2130

This code is a partial implementation of the first section of Steve Reich's * Piano Phase (1967)

Two parallel pitch patterns are played at slightly different tempos, creating a phasing pattern between the two. We only schedule 100 iterations of this phasing pattern due to how the oscillator events are scheduled and not wanting to overload the AudioContext scheduler/memory, but the code could be structured in a way to perform the entire piece with more flexible event scheduling

Wikipedia has a great explanation of the structure of this composition https://en.wikipedia.org/wiki/Piano_Phase
