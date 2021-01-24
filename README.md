# Overwatch MIDI converter
A tool for converting MIDI files into Overwatch workshop arrays, allowing you to play them ingame.  
Example video: https://youtu.be/3bG8LEePLRA  
[Link to this gamemode on workshop.codes](https://workshop.codes/ZPVWJ)  

If you have any feedback, bug reports, or if you just want to say hello, you can contact me on Discord: ScroogeD#5147

# MIDI converter webpage
[Click here!](https://scrooged2.github.io/owmidiconverter/converter)

# Features

- Play up to a few minutes of any MIDI file
- Simultaneously play up to 11 pitches
- Percussion instruments are automatically ignored
- Notes outside the range of the Overwatch piano are automatically transposed up or down
- Support for all Overwatch text languages (See [Known issues](#known-issues) for a note about French.)  

# How to use
**Please note**: Only PC users can convert MIDI files and paste the resulting script into the workshop. Console users can still use the mode, but only by importing workshop codes made by PC users. See [Workshop Codes](#workshop-codes) for example codes with songs.
- Open the [**MIDI converter webpage.**](https://scrooged2.github.io/owmidiconverter/converter)
- Upload a MIDI (.mid) file to the webpage, choose your settings (hover over the texts and read the tooltips for more information), and click Convert MIDI.
  - Make sure to select a language that matches the text language of your Overwatch. If you don't, the generated script can't be pasted into the game. If your text language is French and you're using the Firefox browser, [read this.](#known-issues)
  - If you get a warning about a type 0 file, keep in mind that percussion may still exist in the converted data, causing the bots to play wrong notes. See [#1](https://github.com/ScroogeD2/owmidiconverter/issues/1) for more information.

If all goes well, you will get some info about the conversion, and a long string containing the custom game settings of the mode. Copy the string by pressing Copy to Clipboard, then open the Overwatch custom game settings screen.![gameSettingsImage](https://i.imgur.com/OqkaGqe.png)  

- Click on *Import Settings* to paste in the copied overwatch custom game settings.
- Start the custom game.


# Ingame controls

- Interact (F): start and stop playing the song

You can control the speed at which the song is played:
- Crouch + Primary Fire: Speed up by 5 %-points
- Crouch + Secondary Fire: Slow down by 5 %-points  

You can easily remove all game sounds except the piano:
- **Host player only:** Open the custom game lobby with L, then enter the custom game settings screen. (Optional: if you also want to see the bots playing, you can hide your HUD with Alt+Z)
- **Any player:** Open the custom game lobby with L. Right click your player icon on the top right corner of the screen, and press Career Profile. (Optional: hide HUD with Alt+Z. Note that Esc -> Career profile also works, but doesn't allow you to hide your HUD.)


# Known issues

### Import issues with French on Firefox 

There is a unicode space character in a French workshop string that gets removed by Firefox when copied. To fix this, you must either use the converter in a different browser (e.g. Google Chrome) or import the gamemode in a different way:
  - Import the following code (live servers only): PWGQ1
  - In the MIDI converter, uncheck "Generate Full Gamemode Settings"
  - Choose French as the language in the converter, then click Convert MIDI and copy + paste the generated script to the workshop screen: https://i.imgur.com/Dfkc0gk.png
  - Start the game.

### Other issues
See [issues on Github.](https://github.com/ScroogeD2/owmidiconverter/issues)  


# Workshop codes
- Moonlight sonata movement 3: DYAV0  
- Fantaisie impromptu: CAVXP  
- Pokemon Red/Blue trainer battle music: KJJGK  
- Pokemon Gold/Silver champion battle music: CCAVB  
- Pokemon Red/Blue gym leader music: RNV2Z  
- Pokemon Gold/Silver trainer battle music: 6PG2Z  
- Pokemon Red/Blue wild battle music: Q3TGH  
- Pokemon Red/Blue team rocket hideout music: TK1XB  
- Pokemon Red/Blue champion battle music: RT3PE  

All Pokemon Red/Blue themes were transcribed by Mark Benis.



# Workshop array structure

The data read by the Overwatch workshop contains only the necessary information to play a song: pitches and timings of notes. The data is saved in 3 separate arrays: 

- Time Arrays
  - Contains the time intervals between chords, in milliseconds
  - For example: Array(67, 67, 67, 123, 2, 1000, 67, 67, ...)
- Chord Arrays
  - Contains the amounts of pitches in each chord. Chords can have up to of 6 pitches by default, but this can be increased in the converter to a maximum of 11 (Overwatch hero limit is 12, each bot takes a slot, and 11 slots for bots leaves one for the host player).
  - For example: Array(1, 1, 1, 1, 2, 3, 1, 7, 1, ...)
- Pitch Arrays
  - Contains all pitches used in the song. Similar to the pitches of MIDI files, one integer is one semitone. The scale starts at 0 (C1) and ends at 64 (E6). For example, C4 (262hz) has a pitch of 36.
  - For example: Array(23, 30, 62, 23, 10, 23, 10, ...)

Arrays in overwatch are limited to a maximum of 1000 elements per dimension, but over a hundred thousand elements across all dimensions. Due to this, each array is split into multiple indexes of a single 2d array. For example:
```
pitchArrays = [0]: Array of 1000
              [1]: Array of 1000
              [2]: Array of 1000
              [3]: Array of 123
```

### SONG EXAMPLE
The following arrays contain a song that plays the note G4 (pitch 43) at time 0, followed by a C minor chord (pitches 48, 51, 55) at time 0.5, followed by another G4 note at time 2.0, and another C minor chord an octave lower (pitches 36, 39, 43) at time 2.7.

```
timeArrays[0]  = Array(0, 500, 1500, 700)
chordArrays[0] = Array(1, 3, 1, 3)
pitchArrays[0] = Array(43, 48, 51, 55, 43, 36, 39, 43)
```

### COMPRESSION

To save size, several data elements are saved in a single 7-digit number. For example, when the maximum length of a data element is 3:

```
Data:             Array(12, 0, 312, 2, 56, 23, 23, 4, 153, 123, 110, ...)  
Compressed data:  Array(0120003, 1200205, 6023023, 0041531, 23110...)
```

Total Element Count (TEC) is the limit to how much data can be pasted into the workshop prior to starting the custom game.
The amount of data generated during runtime (by e.g. decompression) is far less limited.

When pasting numbers (all of them act like floats regardless of their actual content) into the workshop, the increase in TEC is only affected by 
the amount of numbers, not their individual sizes. String arrays could be used for far better efficiency instead of number arrays
(128 characters per array element and not limited to digits 0-9), but there is no straightforward way to read them 
with workshop due to lack of simple string methods. Up to 7 digits can be used per number without running into issues with floating point precision. 

All 3 song data arrays use the compression above, with the following data element lengths:

- Time Arrays: Maximum length of 4 (between 0000 and 9999 milliseconds, 0 to ~10 seconds)
- Chord Arrays: Maximum length of 2 (between 01 and 11)
- Pitch Arrays: Maximum length of 2 (between 00 and 64)

### COMPRESSION EXAMPLE

The song example from above would be compressed into:
```
timeArrays[0]  = Array(0000050, 0150007, 00)
chordArrays[0] = Array(0103010, 3)
pitchArrays[0] = Array(4348515, 5433639, 43)
```

Note that because data such as 00 becomes 0 after being pasted to the workshop, it is necessary to know the intended length of the final array elements (all of the others can be assumed to be 7). These, along with the lengths of the song data elements, are pasted into the workshop as part of the compressionInfo variable. (Check writeWorkshopRules() in src/owmidiparser.js for more info) 

# Special thanks
(In no particular order)
- Mark Benis, for [the best transcriptions of Pokemon Red/Blue music I've seen](https://youtu.be/2WG9V6C1Aew), which allowed me to test the limits of the workshop script
- LazyLion and Zezombye, for help with optimizing and debugging
- An anonymous cat, for various optimizations
- Tonejs/Midi, for easy MIDI file reading with Javascript
- [Zezombye's OverPy](https://github.com/Zezombye/overpy), for its comprehensive language docs
- The workshop team at Blizzard, for being awesome in general
